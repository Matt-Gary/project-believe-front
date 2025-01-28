export function CardVideo({ url, title, description, thumbnail }) {
  return (
    <a
      href={url}
      className="max-w-[350px]  hover:scale-105 transition-transform duration-300 ease-in-out"
      target="_blank"
    >
      <img
        src={thumbnail}
        alt="Thumbnail do vídeo"
        class="w-full h-auto rounded-t-md object-cover"
      />
      <div className="w-full h-0.5 bg-[#00B4D8]"></div>
      <div className="bg-[#3C3C3C] p-4 rounded-b-md">
        <h1 className="font-bold text-xl">{title}</h1>
        <span className="text-[#BFBFBF] font-bold text-sm">{description}</span>
      </div>
    </a>
  );
}
