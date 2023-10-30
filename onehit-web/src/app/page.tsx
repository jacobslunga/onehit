import SpotifyButton from "@/components/SpotifyButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex bg-dark_bg min-h-screen flex-row items-center justify-between">
      <div className="flex flex-col items-start px-40 justify-center w-2/3 h-screen">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "radial-gradient(#790252, transparent)",
          }}
        />

        <div className="flex z-20 flex-row items-center justify-center absolute top-10">
          <Image
            width={32}
            height={32}
            alt="Icon"
            src="/SecondaryIcon.svg"
            className="mr-2"
          />
          <h1 className="font-logo text-white text-xl">OneHit</h1>
        </div>

        <h1
          className="font-bold z-20 text-white text-5xl mt-8"
          style={{ lineHeight: "1.2" }}
        >
          Where the best hits are shared.
        </h1>
        <p className="text-[rgba(255,255,255,0.5)] z-20 text-md mt-2">
          Find the best hits from your favorite artists. Vote for your favorite
          hits every week.
        </p>

        <SpotifyButton />
      </div>
      <div className="w-1/3 h-screen flex flex-col items-start justify-center z-20">
        <Link
          href="/our-mission"
          className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-bold text-2xl mb-10"
        >
          Our Mission
        </Link>
        <Link
          href="/about"
          className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-bold text-2xl mb-10"
        >
          About
        </Link>
        <Link
          href="/work-with-us"
          className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-bold text-2xl"
        >
          Work With Us
        </Link>
      </div>
    </main>
  );
}
