import Header from "@/components/Auth/Header";
import Main from "@/components/Auth/Sections/Main";
import PageTransition from "@/components/util/PageTransition";

export default function Home() {
  return (
    <main className="flex fixed top-0 bottom-0 left-0 right-0 overflow-auto bg-dark_bg flex-col items-start justify-start">
      <Header />
      <PageTransition>
        <Main />
      </PageTransition>
    </main>
  );
}
