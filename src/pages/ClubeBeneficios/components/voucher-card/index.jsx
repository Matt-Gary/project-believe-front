import { ModalVoucher } from '../modal-voucher';
import { Percent } from 'lucide-react';

export function VoucherCard({
  logo,
  valor,
  detalhes,
  descricao,
  comoUsar,
  benefitId,
}) {
  // Verifica se o logo é uma URL
  const isImageUrl =
    typeof logo === 'string' &&
    (logo.startsWith('http://') || logo.startsWith('https://'));

  return (
    <div className="w-[280px] h-[320px] shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group">
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-6 flex flex-col items-center justify-center h-[180px] relative">
        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 text-sm font-bold rounded-full flex items-center">
          <Percent className="w-4 h-4 mr-1" />
          {valor}%
        </div>
        {isImageUrl ? (
          <img
            src={logo}
            alt="Logo da empresa"
            className="max-h-[120px] max-w-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{logo}</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-700 p-5 flex flex-col h-[140px]">
        <h3 className="text-lg font-bold text-zinc-800 dark:text-white mb-2 line-clamp-1">
          {isImageUrl ? detalhes.split('@')[0] : logo}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-2">
          {descricao}
        </p>
        <div className="mt-auto">
          <ModalVoucher
            valor={valor}
            detalhes={detalhes}
            comoUsar={comoUsar}
            descricao={descricao}
            benefitId={benefitId}
          >
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 flex items-center justify-center">
              Resgatar Voucher
            </button>
          </ModalVoucher>
        </div>
      </div>
    </div>
  );
}
