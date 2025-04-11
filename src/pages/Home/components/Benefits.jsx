import { Link } from 'react-router-dom';
import { CardBenefits } from '../components/ui/CardBenefit';
import { useState, useEffect } from 'react';
import api from '@/api';
import {
  Percent,
  Gift,
  PercentCircle,
  BadgePercent,
  Store,
  ShoppingBag,
} from 'lucide-react';

export function Benefits() {
  const [beneficios, setBeneficios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para construir a URL completa da imagem no S3
  const getImageUrl = (path) => {
    if (!path) return null;
    // Verificar se já é uma URL completa
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Construir URL do S3
    return `https://believe-images.s3.us-east-1.amazonaws.com/${path}`;
  };

  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        setLoading(true);
        const response = await api.get('/benefits');
        console.log('Benefícios carregados da API:', response.data);

        // Se quisermos limitar a quantidade exibida na home
        const limitedBeneficios = response.data.slice(0, 4);
        setBeneficios(limitedBeneficios);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar benefícios:', err);
        setError('Não foi possível carregar os benefícios');
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficios();
  }, []);

  // Função para renderizar um ícone baseado no benefício
  const renderLogo = (beneficio) => {
    if (beneficio.companyLogo) {
      // Obter a URL completa da imagem
      const imageUrl = getImageUrl(beneficio.companyLogo);
      console.log('Imagem URL:', imageUrl);

      // Se tiver logo, usar a URL completa
      return (
        <img
          src={imageUrl}
          alt={beneficio.companyName}
          className="w-16 h-16 object-contain"
          onError={(e) => {
            console.error('Erro ao carregar imagem:', imageUrl);
            // Se houver erro ao carregar a imagem, usar ícones bonitos
            e.target.style.display = 'none';
            // Selecionar um ícone aleatório quando a imagem falhar
            const icons = [
              '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400"><circle cx="12" cy="12" r="10"></circle><path d="m10 8 4 8"></path><path d="m14 8-4 8"></path></svg>',
              '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><circle cx="12" cy="12" r="8"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>',
              '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-green-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path></svg>',
            ];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            e.target.parentNode.innerHTML = randomIcon;
          }}
        />
      );
    }

    // Caso contrário, usar um ícone baseado no desconto
    if (beneficio.discount && String(beneficio.discount).includes('%')) {
      return (
        <PercentCircle
          className="w-12 h-12 text-orange-400"
          stroke-width={1.5}
        />
      );
    } else if (
      beneficio.companyName &&
      beneficio.companyName.toLowerCase().includes('loja')
    ) {
      return <Store className="w-12 h-12 text-blue-400" stroke-width={1.5} />;
    } else if (
      beneficio.companyName &&
      beneficio.companyName.toLowerCase().includes('academia')
    ) {
      return <Gift className="w-12 h-12 text-green-400" stroke-width={1.5} />;
    } else {
      return (
        <ShoppingBag className="w-12 h-12 text-purple-400" stroke-width={1.5} />
      );
    }
  };

  return (
    <section className="wrapper">
      <h2 className="mb-16 text-center text-3xl uppercase md:text-start md:text-5xl font-bold">
        Believe Club de Benefícios
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-neutral-400">{error}</div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {beneficios && beneficios.length > 0 ? (
              beneficios.map((beneficio) => (
                <CardBenefits
                  key={beneficio.id}
                  logo={renderLogo(beneficio)}
                  title={beneficio.companyName || 'Parceiro'}
                  description={`${beneficio.discount || 'Desconto especial'} - ${beneficio.description || 'Entre em contato para mais informações'}`}
                />
              ))
            ) : (
              // Mostrar mensagem se não houver benefícios
              <div className="col-span-full text-center py-5 text-neutral-400">
                Nenhum benefício disponível no momento
              </div>
            )}
          </div>

          <div className="flex justify-center sm:justify-start">
            <Link to="/clube-beneficios" className="button">
              Ver Todos
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
