export function CardCalendarPrincipal({
  imagemEvento,
  data,
  titulo,
  descricao,
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

  const { dia, mes } = formatarData(data);

  return (
    <div className="relative flex flex-col rounded-md overflow-hidden h-full max-h-[400px]">
      {/* Badge com a data */}
      <div className="absolute top-0 left-0 z-10 bg-zinc-900 rounded-b-md text-white px-6 py-4">
        <p className="text-lg uppercase">{mes}</p>
        <p className="text-5xl font-bold">{dia}</p>
      </div>

      {/* Imagem de fundo */}
      <div className="w-full h-full">
        <img
          src={imagemEvento}
          alt={titulo || 'Evento em destaque'}
          className="w-full h-full object-cover min-h-[300px]"
        />
      </div>
    </div>
  );
}
