import Header from "@/components/Auth/Header";
import Mission from "@/components/Auth/Sections/Mission";
import PageTransition from "@/components/util/PageTransition";
import { FC } from "react";

interface OurMissionProps {}

const OurMission: FC<OurMissionProps> = ({}) => {
  return (
    <main className="flex fixed top-0 bottom-0 left-0 right-0 overflow-auto bg-dark_bg flex-col items-start justify-start">
      <Header />
      <PageTransition>
        <Mission />
      </PageTransition>
    </main>
  );
};

export default OurMission;
