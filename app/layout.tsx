import { Manrope } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import PageTransition from "@/components/animate/PageTransition";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Layout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Layout) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
