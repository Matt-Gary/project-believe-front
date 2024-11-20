export function CardProduct({ src, type }) {
  return (
    <div
      className="relative h-[200px] rounded-2xl bg-cover bg-center"
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      <span className="absolute mt-3 rounded-r-full bg-white px-4 py-1 text-center font-bold text-black">
        {type}
      </span>
    </div>
  );
}
