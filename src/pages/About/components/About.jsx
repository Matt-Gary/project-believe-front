import Image1 from "../../../assets/about-page-image-1.webp";

export function About() {
  return (
    <section className="wrapper">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-8 lg:items-start">
          <h2 className="text-3xl font-bold uppercase sm:text-6xl">
            Quem somos
          </h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, eos
            earum ab obcaecati sint maxime deserunt explicabo deleniti pariatur
            sed iure atque nobis quia autem velit ipsa esse, consectetur sequi?
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, eos
            earum ab obcaecati sint maxime deserunt explicabo deleniti pariatur
            sed iure atque nobis quia autem velit ipsa esse, consectetur sequi?
          </p>
        </div>
        <img src={Image1} alt="" className="max-h-[30rem] w-full rounded-2xl" />
      </div>
    </section>
  );
}
