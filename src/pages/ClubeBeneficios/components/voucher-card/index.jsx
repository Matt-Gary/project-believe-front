import { ModalVoucher } from '../modal-voucher';

export function VoucherCard({ logo, valor, detalhes, descricao, comoUsar }) {
  return (
    <div className="w-[300px]">
      <div className="bg-[#D9D9D9] rounded-t-md p-4 flex items-center justify-center w-[300px] h-[150px]">
        <span className="text-black ">{logo}</span>
      </div>
      <div className="bg-zinc-600 flex justify-between font-bold p-5 rounded-b-md">
        <p className="text-xl">Voucher de R$ {valor}</p>
        <ModalVoucher
          valor={valor}
          detalhes={detalhes}
          comoUsar={comoUsar}
          descricao={descricao}
        >
          <button className="bg-[#00B4D8] text-sm rounded-full px-3 hover:opacity-75 duration-300">
            Claim
          </button>
        </ModalVoucher>
      </div>
    </div>
  );
}
