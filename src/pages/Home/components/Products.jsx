import { Link } from "react-router-dom";
import { CardProduct } from "./ui/CardProduct";
import { dataProduct } from "../utils/data-product";

export function Products() {
  return (
    <section className="wrapper grid grid-cols-1 items-center gap-16 pt-16 lg:grid-cols-2 lg:pt-32">
      <div className="order-1 flex flex-col gap-8 lg:order-2">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-start lg:text-6xl">
          Conheça nossos produtos
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
          pariatur, sapiente doloremque quaerat perferendis repellendus
          praesentium est delectus incidunt.
        </p>
        <div className="flex items-center justify-center sm:justify-start">
          <Link className="button">Navegar</Link>
        </div>
      </div>
      <div className="order-2 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 md:order-1">
        {dataProduct.map((product) => (
          <CardProduct
            key={product.src}
            src={product.src}
            type={product.type}
          />
        ))}
      </div>
    </section>
  );
}
