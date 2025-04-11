import imagem from '../../../../assets/about-page-image-1.webp';

export function CardEventsMain({ id, title, description, date, imageUrl }) {
  // Formatar a data para exibição
  const formatDate = (dateString) => {
    if (!dateString) return { day: '--', month: '---' };

    const [day, month, year] = dateString.split('/');

    const months = [
      'JAN',
      'FEV',
      'MAR',
      'ABR',
      'MAI',
      'JUN',
      'JUL',
      'AGO',
      'SET',
      'OUT',
      'NOV',
      'DEZ',
    ];
    const monthName = months[parseInt(month, 10) - 1];

    return { day, month: monthName };
  };

  const { day, month } = formatDate(date);

  return (
    <div className="relative min-h-full w-full max-w-[500px] mt-4 rounded-xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500 cursor-pointer">
      {/* Overlay com gradiente por cima da imagem */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-50 duration-500"></div>

      <img
        className="w-full h-full object-cover aspect-[16/9] transition-transform duration-700 group-hover:scale-105"
        src={imageUrl || imagem}
        alt={title || 'Imagem Evento Principal'}
      />

      {/* Data do evento */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-center absolute left-4 px-5 py-4 rounded-lg top-4 z-20 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-wide text-white/90">
          {month}
        </p>
        <span className="text-2xl font-bold text-white">{day}</span>
      </div>

      {/* Título e descrição com animação na hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent z-20 transform transition-transform duration-500">
        <div className="space-y-2 transform transition-all duration-500 group-hover:translate-y-[-8px]">
          <h2 className="font-bold text-2xl text-white line-clamp-1 group-hover:text-blue-300 transition-colors duration-300">
            {title || 'Próximo Evento'}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <p className="text-base text-gray-300 line-clamp-3 mt-2 max-w-md">
            {description ||
              'Descrição do evento principal com todas as informações necessárias para você não perder este evento incrível.'}
          </p>

          <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center">
            <span className="text-blue-400 text-sm font-medium">
              Saiba mais
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
