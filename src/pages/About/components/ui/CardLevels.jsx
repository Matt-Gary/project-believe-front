export function CardLevels({ level, content }) {
  return (
    <div className="card-glass flex flex-col gap-2 rounded-2xl border-opacity-20 p-8">
      <h3 className="mb-4 text-2xl">{level}</h3>
      {content.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}
