"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { useTransition } from "./PageTransition";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export const TransitionLink = ({ children, href, className, ...props }: TransitionLinkProps) => {
  const { navigateTo } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <Link {...props} href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};
