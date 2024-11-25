import { Link } from "react-router-dom";
import { About } from "./components/About";
import { Comunity } from "./components/Comunity";
import { AllLevels } from "./components/AllLevels";
import { Team } from "./components/Team";
import { Journey } from "@/components/Journey";

export function AboutPage() {
  return (
    <>
      <main>
        <section className="flex items-center justify-center">
          <div className="wrapper flex flex-col items-center justify-center py-44 lg:pb-32 lg:pt-48">
            <h1 className="mb-8 max-w-[23ch] text-center text-3xl font-bold uppercase sm:text-6xl">
              <span className="italic text-accent">{'"'}</span>Focando no
              impossível, porque lá a concorrência é menor.
              <span className="italic text-accent">{'"'}</span>
            </h1>
            <p className="mb-8 text-2xl italic">– Walt Disney</p>
          </div>
        </section>
        <About />
        <Comunity />
        <AllLevels />
        <Team />
        <Journey />
      </main>
    </>
  );
}
