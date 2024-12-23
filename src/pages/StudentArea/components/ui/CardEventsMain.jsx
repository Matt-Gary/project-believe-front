import imagem from '../../../../assets/about-page-image-1.webp';
export function CardEventsMain() {
  return (
    <div className="relative min-h-full w-full max-w-[500px]  mt-4 rounded-md">
      <img
        className="w-full rounded-md h-full object-cover rounded-t-md opacity-50 aspect-auto"
        src={imagem}
        alt="Imagem Evento"
      />
      <div className="bg-zinc-800 text-center absolute left-4 px-5 py-4 rounded-b-lg top-0">
        <p>AUG</p>
        <span>12</span>
      </div>
    </div>
  );
}
