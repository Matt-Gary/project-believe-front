import { CardTeam } from "./ui/CardTeam";
import { team } from "./utils/data-team";

export function Team() {
  return (
    <section className="wrapper lg:pt-48">
      <h2 className="mb-16 text-center text-3xl font-bold uppercase sm:text-6xl lg:text-start">
        Nossa equipe
      </h2>
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {team.map((trainer) => (
          <CardTeam
            key={trainer.name}
            name={trainer.name}
            description={trainer.description}
            photo={trainer.photo}
          />
        ))}
      </div>
    </section>
  );
}
