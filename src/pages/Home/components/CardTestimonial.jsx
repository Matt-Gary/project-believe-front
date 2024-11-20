import { MdOutlineStar, MdPerson } from "react-icons/md";

export function CardTestimonials({ description, student }) {
  return (
    <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8">
      <div className="flex items-center gap-1">
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
        <MdOutlineStar />
      </div>
      <p>{description}</p>
      <div className="flex items-center gap-4">
        <div className="w-fit rounded-md bg-neutral-700 p-4">
          <MdPerson />
        </div>
        <div className="flex flex-col gap-1">
          <span>{student}</span>
          <span className="text-neutral-400">Aluno</span>
        </div>
      </div>
    </div>
  );
}
