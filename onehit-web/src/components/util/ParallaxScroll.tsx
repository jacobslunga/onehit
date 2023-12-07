"use client";

import React, { useEffect, useState } from "react";

import { FC } from "react";

interface ParallaxScrollProps {
  children: React.ReactNode;
}

const ParallaxScroll: FC<ParallaxScrollProps> = ({ children }) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ transform: `translateY(-${offsetY * 0.5}px)` }}
      className="w-full flex flex-row items-center justify-between h-full"
    >
      {children}
    </div>
  );
};

export default ParallaxScroll;
