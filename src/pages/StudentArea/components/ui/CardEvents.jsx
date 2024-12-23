import imagem from '../../../../assets/about-page-image-1.webp';
export function CardEvents() {
  return (
    <div className="flex flex-col items-center bg-white rounded-md mt-4 shadow-md relative">
      <img
        className="w-full h-2/4 object-cover rounded-t-md"
        src={imagem}
        alt="Imagem Evento"
      />
      <div className="bg-zinc-800 text-center absolute left-2 px-2 py-1 rounded-b-lg">
        <p>AUG</p>
        <span>12</span>
      </div>
      <div className="*:text-center px-8 py-6 ">
        <h2 className="font-bold text-xl text-zinc-800">Nome do evento</h2>
        <p className="text-sm text-zinc-800">Descrição do evento</p>
      </div>
    </div>
  );
}
