import { Link } from 'react-router-dom';

export function CardGallery({ image, title, date, id }) {
  return (
    <div className="max-w-[350px]">
      <img src={image} alt="" className="rounded-t-md object-cover  h-64" />
      <div className="w-full h-0.5 bg-[#00B4D8]"></div>
      <div className="flex flex-col gap-1 bg-[#3C3C3C] p-3 rounded-b-md">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-[#BFBFBF] text-sm">{date}</p>
        <div className="my-2">
          <Link
            to={`/galeria/${id}`}
            className="bg-[#00B4D8] px-3 py-1 rounded-full text-sm hover:opacity-75 duration-300"
          >
            Ver imagens
          </Link>
        </div>
      </div>
    </div>
  );
}
