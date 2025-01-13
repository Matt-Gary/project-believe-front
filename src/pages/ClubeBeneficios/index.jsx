import { ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VoucherCard } from './components/voucher-card';
import { ModalVoucher } from './components/modal-voucher';

const vouchers = [
  {
    logo: 'logo1.png',
    valor: '10',
    descricao: 'Desconto de 10% em produtos selecionados.',
    detalhes: 'Válido para compras acima de R$100.',
    comoUsar: 'Apresente este voucher no caixa.',
  },
  {
    logo: 'logo2.png',
    valor: '20',
    descricao: 'Desconto de R$20 em sua próxima compra.',
    detalhes: 'Válido para compras acima de R$150.',
    comoUsar: 'Insira o código do voucher no checkout.',
  },
  {
    logo: 'logo3.png',
    valor: '30',
    descricao: 'Desconto de 30% em serviços selecionados.',
    detalhes: 'Válido para novos clientes.',
    comoUsar: 'Apresente este voucher na recepção.',
  },
  {
    logo: 'logo4.png',
    valor: '40',
    descricao: 'Desconto de R$40 em produtos eletrônicos.',
    detalhes: 'Válido para compras acima de R$200.',
    comoUsar: 'Insira o código do voucher no checkout.',
  },
  {
    logo: 'logo5.png',
    valor: '50',
    descricao: 'Desconto de 50% em roupas e acessórios.',
    detalhes: 'Válido para compras acima de R$250.',
    comoUsar: 'Apresente este voucher no caixa.',
  },
  {
    logo: 'logo6.png',
    valor: '60',
    descricao: 'Desconto de R$60 em produtos de beleza.',
    detalhes: 'Válido para compras acima de R$300.',
    comoUsar: 'Insira o código do voucher no checkout.',
  },
  {
    logo: 'logo7.png',
    valor: '70',
    descricao: 'Desconto de 70% em itens de decoração.',
    detalhes: 'Válido para compras acima de R$350.',
    comoUsar: 'Apresente este voucher no caixa.',
  },
  {
    logo: 'logo8.png',
    valor: '80',
    descricao: 'Desconto de R$80 em produtos esportivos.',
    detalhes: 'Válido para compras acima de R$400.',
    comoUsar: 'Insira o código do voucher no checkout.',
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
