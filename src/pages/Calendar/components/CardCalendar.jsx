import { Calendar, Clock } from 'lucide-react';

export function CardCalendar({
  imagemEvento,
  data,
  titulo,
  descricao,
  horario,
}) {
  // Formatação da data ISO para exibição
  const formatarData = (dataISO) => {
    if (!dataISO) return { dia: '', mes: '' };

    try {
      const data = new Date(dataISO);

      // Obtém o dia
      const dia = data.getDate();

      // Obtém o mês abreviado em português
      const meses = [
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
      const mes = meses[data.getMonth()];

      return { dia, mes };
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return { dia: '', mes: '' };
    }
  };

  // Formatação do horário se necessário
  const formatarHorario = (horaString) => {
    // Se já estiver no formato HH:MM, retorna como está
    if (typeof horaString === 'string' && horaString.match(/^\d{1,2}:\d{2}$/)) {
      return horaString;
    }

    // Caso contrário, retorna um horário padrão
    return '19:00';
  };

  const { dia, mes } = formatarData(data);
  const horaFormatada = formatarHorario(horario);

  return (
    <div className="flex flex-col bg-zinc-800 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      {/* Container da imagem */}
      <div className="relative">
        <img
          src={imagemEvento}
          alt={titulo || 'Evento'}
          className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
        {/* Badge com a data */}
        <div className="absolute top-0 left-0 bg-zinc-900 text-white px-2 py-1 text-center rounded-b-md">
          <p className="text-xs">{mes}</p>
          <p className="text-base font-bold">{dia}</p>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4 bg-zinc-800">
        <h3 className="text-sm font-medium text-center text-gray-200 mb-1 group-hover:text-[#00B4D8] transition-colors">
          {titulo || 'Evento'}
        </h3>
        <p className="text-xs text-center text-gray-200 mb-2">
          {descricao || 'Detalhes do evento'}
        </p>

        {/* Informação de horário com ícone de relógio */}
        <div className="flex items-center justify-center gap-1 text-xs text-gray-200 mt-2">
          <Clock size={12} className="text-[#00B4D8]" />
          <span>{horaFormatada}</span>
        </div>
      </div>
    </div>
  );
}
