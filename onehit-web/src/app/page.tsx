import SpotifyButton from "@/components/SpotifyButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex bg-dark_bg background min-h-screen flex-row items-center justify-between">
      <div className="flex flex-row px-[10%] items-center justify-between w-full absolute top-10">
        <div className="flex z-20 flex-row items-center justify-center">
          <Image
            width={32}
            height={32}
            alt="Icon"
            src="/SecondaryIcon.svg"
            className="mr-2"
          />
          <h1 className="font-logo text-white text-xl">OneHit</h1>
        </div>
        <div className="flex flex-row items-center justify-center z-20">
          <Link
            href="/our-mission"
            className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-reddit-semi text-ms"
          >
            Our Mission
          </Link>
          <Link
            href="/about"
            className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-reddit-semi text-md ml-5 mr-5"
          >
            About
          </Link>
          <Link
            href="/work-with-us"
            className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-200 font-reddit-semi text-md"
          >
            Work With Us
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-start px-[10%] w-2/3 justify-center h-screen">
        <h1
          className="font-logo z-20 text-white text-5xl mt-8"
          style={{ lineHeight: "1.2" }}
        >
          Give us the hit we've been waiting for.
        </h1>
        <p className="text-[rgba(255,255,255,0.5)] font-reddit-reg z-20 text-sm mt-2">
          Find the best hits from your favorite artists. Vote for your favorite
          hits every week.
        </p>

        <SpotifyButton />
      </div>
    </main>
  );
}
