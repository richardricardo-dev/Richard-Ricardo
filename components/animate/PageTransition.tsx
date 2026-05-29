"use client";

import { createContext, useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionContextType {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("useTransition must be used within PageTransition provider");
  return context;
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (href: string) => {

    // Trigger overlay animation
    setIsTransitioning(true);
    
    // Wait for overlay to fade in completely
    setTimeout(() => {
      router.push(href);
      
      // Wait a bit for page to load, then fade out overlay
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 700); 
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#0d0d0d",
              zIndex: 99999,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
