export function CardBenefits({ logo, title, description }) {
  return (
    <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
      <span className="mb-4 flex aspect-square w-fit items-center justify-center rounded-md bg-neutral-900 p-2">
        {logo}
      </span>
      <h3 className="text-2xl font-normal">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
