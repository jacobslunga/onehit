"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div
      className={`bg-transparnet flex flex-row px-[10%] z-50 items-center justify-between w-screen fixed h-[8%] top-0`}
    >
      <Link href="/" className="flex z-20 flex-row items-center justify-center">
        <Image
          width={30}
          height={30}
          alt="Icon"
          src="/SecondaryIcon.svg"
          className="mr-2"
        />
        <h1 className="font-black text-white text-lg">OneHit</h1>
      </Link>
      <div className="flex flex-row items-center justify-center z-20">
        <Link
          href="/our-mission"
          className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-semibold text-sm"
        >
          Our Mission
        </Link>
        <Link
          href="/about"
          className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-semibold text-sm ml-5 mr-5"
        >
          About
        </Link>
        <Link
          href="/work-with-us"
          className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-semibold text-sm"
        >
          Work With Us
        </Link>
        <div className="w-[1px] h-5 rounded-full bg-white ml-5 mr-5" />

        <button className="flex items-center justify-center bg-spotify p-2 rounded-full group">
          <Image
            width={20}
            height={20}
            alt="Icon"
            src="/spotify-white.png"
            className="group-hover:scale-110 transition-transform duration-200"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
