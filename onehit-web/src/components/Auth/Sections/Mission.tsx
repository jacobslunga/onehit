import { FC } from "react";

interface MissionProps {}

const Mission: FC<MissionProps> = ({}) => {
  return (
    <div className="w-screen min-h-screen bg-[#0C0C0C] mission flex flex-col items-start py-[10%] justify-start px-[10%]">
      <h1 className="text-6xl z-40 text-white font-black text-center">
        Our Mission.
      </h1>
      <h2 className="text-xl z-40 text-white font-semibold text-center mt-10">
        Discover and Share.
      </h2>
      <p className="text-md z-40 text-[rgba(255,255,255,0.5)] font-normal max-w-[80%] mt-5">
        We're dedicated to helping you explore the vast, dynamic world of music.
        OneHit is your personal space to share your favorite tunes and uncover
        new hits that others have treasured. Whether it's a chart-topping number
        or an obscure gem, every song has a story waiting to be heard.
      </p>

      <h2 className="text-xl z-40 text-white font-semibold text-center mt-10">
        Empowering Voices.
      </h2>
      <p className="text-md z-40 text-[rgba(255,255,255,0.5)] font-normal max-w-[80%] mt-5">
        Your voice matters. At OneHit, every upvote is a nod to excellence,
        every playlist a testament to collective taste. Our platform gives power
        to the listeners, allowing the community to shape the "Hits of the Week"
        and beyond. This democratic approach ensures that the best music, as
        chosen by you, rises to the top.
      </p>
    </div>
  );
};

export default Mission;
