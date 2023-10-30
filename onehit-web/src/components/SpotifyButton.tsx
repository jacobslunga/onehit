"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

interface SpotifyButtonProps {}

const SpotifyButton: FC<SpotifyButtonProps> = ({}) => {
  const handleSpotifyLogin = () => {
    signIn("spotify", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <button
      onClick={handleSpotifyLogin}
      className="flex hover:scale-105 transition-transform duration-200 flex-row z-20 items-center justify-center bg-spotify rounded-full px-5 py-3 mt-10"
    >
      <Image
        width={32}
        height={32}
        alt="Spotify Logo"
        src="/spotify.svg"
        className="mr-2"
      />
      <span className="font-semibold text-black">Login with Spotify</span>
    </button>
  );
};

export default SpotifyButton;
