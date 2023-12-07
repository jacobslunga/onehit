"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface MainProps {}

const Main: FC<MainProps> = ({}) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center w-screen min-h-screen bg-dark_bg">
      <Image
        src="/bg.jpg"
        alt="Background"
        quality={100}
        priority
        className="w-screen h-screen absolute"
        width={1920}
        height={1080}
      />
      <h1
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        className="text-white text-5xl font-black z-20"
      >
        Music just got social
      </h1>
      <button className="bg-spotify text-sm hover:scale-110 transition-transform duration-200 rounded-full px-5 py-2 text-black font-bold flex flex-row items-center justify-center z-20 mt-10">
        Login with Spotify
        <Image
          src="/spotify.svg"
          alt="Spotify"
          width={30}
          height={30}
          className="ml-2"
        />
      </button>
    </section>
  );
};

export default Main;
