import { CardTestimonials } from "../components/ui/CardTestimonial";
import { dataTestimonials } from "../utils/data-testimonials";
export function Testimonials() {
  return (
    <section className="wrapper flex flex-col gap-8 pt-16 lg:pt-32">
      <h2 className="text-center text-3xl font-bold uppercase sm:text-start lg:text-6xl">
        Depoimentos
      </h2>
      <p className="max-w-[60ch]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum velit
        ex, dignissimos corporis quisquam fugit necessitatibus totam.
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {dataTestimonials.map((testimonial) => (
          <CardTestimonials
            description={testimonial.description}
            student={testimonial.student}
          />
        ))}
      </div>
    </section>
  );
}
