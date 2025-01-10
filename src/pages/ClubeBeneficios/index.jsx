import { ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VoucherCard } from './components/voucher-card';
import { ModalVoucher } from './components/modal-voucher';

const vouchers = [
  {
    logo: 'logo1.png',
    valor: '20',
    descricao: 'Descrição do voucher 1',
    detalhes: 'Detalhes do voucher 1',
    comoUsar: 'Como usar o voucher 1',
  },
  {
    logo: 'logo2.png',
    valor: '50',
    descricao: 'Descrição do voucher 2',
    detalhes: 'Detalhes do voucher 2',
    comoUsar: 'Como usar o voucher 2',
  },
  {
    logo: 'logo3.png',
    valor: '30',
    descricao: 'Descrição do voucher 3',
    detalhes: 'Detalhes do voucher 3',
    comoUsar: 'Como usar o voucher 3',
  },
  {
    logo: 'logo4.png',
    valor: '40',
    descricao: 'Descrição do voucher 4',
    detalhes: 'Detalhes do voucher 4',
    comoUsar: 'Como usar o voucher 4',
  },
  {
    logo: 'logo5.png',
    valor: '60',
    descricao: 'Descrição do voucher 5',
    detalhes: 'Detalhes do voucher 5',
    comoUsar: 'Como usar o voucher 5',
  },
  {
    logo: 'logo6.png',
    valor: '70',
    descricao: 'Descrição do voucher 6',
    detalhes: 'Detalhes do voucher 6',
    comoUsar: 'Como usar o voucher 6',
  },
  {
    logo: 'logo7.png',
    valor: '80',
    descricao: 'Descrição do voucher 7',
    detalhes: 'Detalhes do voucher 7',
    comoUsar: 'Como usar o voucher 7',
  },
  {
    logo: 'logo8.png',
    valor: '90',
    descricao: 'Descrição do voucher 8',
    detalhes: 'Detalhes do voucher 8',
    comoUsar: 'Como usar o voucher 8',
  },
];

export function ClubeBeneficios() {
  return (
    <main className="wrapper py-6 space-y-6 pb-16">
      <Link to={'/'}>
        <ArrowLeft className="bg-zinc-700 hover:bg-zinc-600 duration-300 rounded-full p-1" />
      </Link>
      <div className="flex justify-between">
        <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start">
          Believe club - CLUBE DE BENEFÍCIOS
        </h1>
        <Filter />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {vouchers.map((voucher, index) => (
          <ModalVoucher key={index} valor={voucher.valor}>
            <VoucherCard
              logo={voucher.logo}
              valor={voucher.valor}
              descricao={voucher.descricao}
              detalhes={voucher.detalhes}
              comoUsar={voucher.comoUsar}
            />
          </ModalVoucher>
        ))}
      </div>
    </main>
  );
}
