import { CardLevels } from "./ui/CardLevels";
import { levels } from "../components/utils/data-card-level";

export function AllLevels() {
  return (
    <section className="wrapper flex flex-col gap-8 pb-24 lg:pt-48">
      <h2 className="text-center text-3xl font-bold uppercase sm:text-6xl lg:text-start">
        Para todos os níveis
      </h2>
      <p className="max-w-[60ch]">
        Não importa se você é iniciante ou experiente, nossos programas são
        adaptados para todos os níveis de habilidade.
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {Object.keys(levels).map((level) => (
          <CardLevels key={level} level={level} content={levels[level]} />
        ))}
      </div>
    </section>
  );
}
