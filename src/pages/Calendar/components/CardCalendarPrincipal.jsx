export function CardCalendarPrincipal({
  imagemEvento,
  data,
  titulo,
  descricao,
  horario,
}) {
  // Formatação da data ISO para exibição
  const formatarData = (dataISO) => {
    if (!dataISO)
      return { dia: '', mes: '', diaSemana: '', mesCompleto: '', ano: '' };

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

      // Obtém o nome do mês completo
      const mesesCompletos = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
      const mesCompleto = mesesCompletos[data.getMonth()];

      // Obtém o dia da semana
      const diasSemana = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
      ];
      const diaSemana = diasSemana[data.getDay()];

      // Obtém o ano
      const ano = data.getFullYear();

      return { dia, mes, diaSemana, mesCompleto, ano };
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return { dia: '', mes: '', diaSemana: '', mesCompleto: '', ano: '' };
    }
  };

  const { dia, mes, diaSemana, mesCompleto, ano } = formatarData(data);

  return (
    <div className="relative flex flex-col rounded-md overflow-hidden h-full shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
      {/* Badge com a data */}
      <div className="absolute top-0 left-0 z-10 bg-zinc-900 rounded-br-md text-white px-6 py-4">
        <p className="text-lg uppercase">{mes}</p>
        <p className="text-5xl font-bold">{dia}</p>
      </div>

      {/* Imagem de fundo com overlay escuro para destaque */}
      <div className="w-full h-[320px] relative">
        <img
          src={imagemEvento}
          alt={titulo || 'Evento em destaque'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60"></div>
      </div>

      {/* Informações do evento */}
      <div className="bg-zinc-800 text-white p-6 flex-1">
        {/* Faixa de destaque */}
        <div className="h-1 w-24 bg-blue-500 mb-4 rounded-full"></div>

        {/* Título com tamanho maior */}
        <h3 className="text-2xl font-bold mb-3 leading-tight">{titulo}</h3>

        {/* Informações sobre data e hora */}
        <div className="flex flex-col mb-4 text-gray-300">
          <p className="mb-1 text-sm">
            <span className="font-medium">{diaSemana}</span>, {dia} de{' '}
            {mesCompleto} de {ano}
          </p>
          {horario && (
            <p className="text-sm flex items-center">
              <span className="inline-block w-4 h-4 mr-2 rounded-full bg-blue-500"></span>
              Horário: <span className="font-medium ml-1">{horario}</span>
            </p>
          )}
        </div>

        {/* Descrição com espaçamento maior */}
        <p className="text-sm leading-relaxed text-gray-200">{descricao}</p>
      </div>
    </div>
  );
}
