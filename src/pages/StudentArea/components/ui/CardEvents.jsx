import imagem from '../../../../assets/about-page-image-1.webp';

export function CardEvents({ id, title, description, date, imageUrl }) {
  // Se não houver dados, mostra um card vazio
  if (!id) {
    return (
      <div className="flex flex-col items-center bg-zinc-800/40 rounded-lg mt-4 shadow-lg h-[200px] justify-center border border-zinc-700/50 overflow-hidden group hover:border-zinc-600 transition-all duration-300">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-700/30 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-zinc-500 text-center font-medium">
          Nenhum evento adicional
        </p>
      </div>
    );
  }

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
    <div className="flex flex-col bg-white rounded-lg mt-4 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          className="w-full h-[120px] object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageUrl || imagem}
          alt={title || 'Imagem Evento'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-center absolute left-2 top-2 px-3 py-1 rounded-lg shadow-md">
          <p className="text-xs font-medium text-white">{month}</p>
          <span className="text-sm font-bold text-white">{day}</span>
        </div>
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
        <h2 className="font-bold text-lg text-zinc-800 line-clamp-1 group-hover:text-blue-700 transition-colors duration-300">
          {title || 'Nome do evento'}
        </h2>
        <p className="text-sm text-zinc-600 line-clamp-2 mt-1">
          {description || 'Descrição do evento'}
        </p>
        <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
      </div>
    </div>
  );
}
