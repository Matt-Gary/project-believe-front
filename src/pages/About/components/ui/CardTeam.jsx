export function CardTeam({ photo, name, description }) {
  return (
    <div className="card-glass relative flex flex-col gap-4 rounded-2xl p-8">
      <div className="relative">
        <img
          className="mb-4 max-h-[250px] w-full rounded-b-lg rounded-t-md object-cover"
          src={photo}
          alt={name}
        />
        <h3 className="absolute bottom-0 left-0 right-0 mb-4 rounded-b-md bg-zinc-800 p-1 text-center text-xl font-normal text-zinc-100">
          {name}
        </h3>
      </div>
      <p>{description}</p>
    </div>
  );
}
