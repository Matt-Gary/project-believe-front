export function CardBenefits({ logo, title, description }) {
  // Verificar se temos uma descrição e se ela tem um formato válido
  const hasValidDescription = description && typeof description === 'string';

  // Verificar se a descrição contém porcentagem
  const hasPercentage = hasValidDescription && description.includes('%');

  // Obter o desconto e a descrição separadamente
  let discount = '';
  let descriptionText = description;

  if (hasValidDescription && description.includes('-')) {
    const parts = description.split('-');
    discount = parts[0].trim();
    descriptionText = parts.slice(1).join('-').trim();
  }

  return (
    <div className="card-glass flex flex-col gap-4 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 h-full">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-shrink-0 bg-neutral-900 rounded-lg p-4 flex items-center justify-center min-w-[70px] min-h-[70px]">
          {logo}
        </div>
        {/* Exibir porcentagem de desconto se presente na descrição */}
        {hasPercentage && (
          <span className="text-orange-400 font-bold text-xl bg-neutral-900/50 px-3 py-1 rounded-full">
            {discount}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-semibold mt-2">{title || 'Parceiro'}</h3>
      <p className="text-neutral-300 line-clamp-3 text-sm flex-grow">
        {descriptionText || 'Entre em contato para mais informações'}
      </p>
      <div className="mt-3 flex justify-end">
        <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">
          Ver detalhes →
        </span>
      </div>
    </div>
  );
}
