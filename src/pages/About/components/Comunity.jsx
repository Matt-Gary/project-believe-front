import Image2 from "../../../assets/about-page-image-2.webp";

export function Comunity() {
  return (
    <section className="wrapper py-24 lg:pt-48">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <img
          src={Image2}
          alt=""
          className="order-2 max-h-[30rem] w-full rounded-2xl lg:order-1"
        />
        <div className="order-1 flex flex-col gap-8">
          <h2 className="text-center text-3xl font-bold uppercase sm:text-6xl lg:text-start">
            Comunidade inspiradora
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
      </div>
    </section>
  );
}
