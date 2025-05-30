import { ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VoucherCard } from './components/voucher-card';
import { ModalVoucher } from './components/modal-voucher';
import api from '../../api';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';

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
  const { userData } = useContext(AuthContext);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Constrói a URL completa do S3
  const getImageUrl = (path) => {
    if (!path) return null;
    // Verificar se já é uma URL completa
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Construir URL do S3
    return `https://believe-images.s3.us-east-1.amazonaws.com/${path}`;
  };

  async function getVouchers() {
    setLoading(true);
    try {
      const response = await api.get('/benefits');

      // Adicionar URLs completas às imagens
      const vouchersWithFullUrls = response.data.map((voucher) => ({
        ...voucher,
        fullImageUrl: voucher.companyLogo
          ? getImageUrl(voucher.companyLogo)
          : null,
      }));

      setVouchers(vouchersWithFullUrls);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar benefícios:', error);
      setError(
        'Não foi possível carregar os benefícios. Tente novamente mais tarde.',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getVouchers();
  }, []);

  return (
    <main className="wrapper py-6 space-y-6 pb-16">
      <Link to={'/'}>
        <ArrowLeft className="bg-zinc-700 hover:bg-zinc-600 duration-300 rounded-full p-1" />
      </Link>
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between sm:gap-0">
        <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start">
          Believe club - CLUBE DE BENEFÍCIOS
        </h1>
        {userData?.role === 'ADMIN' && (
          <Button>
            <Link to="/editar-beneficios">Editar Conteúdo</Link>
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => (
              <ModalVoucher
                key={voucher.id}
                benefitId={voucher.id}
                valor={voucher.discount}
                detalhes={voucher.companyEmail}
                descricao={voucher.description}
                comoUsar={voucher.description}
                logoUrl={voucher.fullImageUrl}
              >
                <VoucherCard
                  benefitId={voucher.id}
                  logo={voucher.fullImageUrl || voucher.companyName}
                  valor={voucher.discount}
                  descricao={voucher.description}
                  detalhes={voucher.companyEmail}
                  comoUsar={voucher.description}
                />
              </ModalVoucher>
            ))
          ) : (
            <div className="col-span-full text-center py-5 text-neutral-400">
              Nenhum benefício disponível no momento
            </div>
          )}
        </div>
      )}
    </main>
  );
}
