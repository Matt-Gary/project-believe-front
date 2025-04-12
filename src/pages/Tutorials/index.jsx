import { useEffect, useState, useContext } from 'react';
import { CardVideo } from './components/CardVideo';
import api from '@/api';
import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

export function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Array de vídeos locais para fallback ou caso a API falhe
  const fallbackVideos = [
    {
      id: 1,
      title: 'Como Começar a Treinar Abdômen da Forma Correta na Calistenia',
      description: 'Treino de Abdômen da forma Correta',
      url: 'https://www.youtube.com/watch?v=Lkb_0g4ThXE',
      thumbnail: 'https://img.youtube.com/vi/Lkb_0g4ThXE/hqdefault.jpg',
    },
    {
      id: 2,
      title: 'Como definir o peitoral SEM EQUIPAMENTOS mesmo sendo iniciante',
      description: 'Treino de Peitoral Sem Equipamentos',
      url: 'https://www.youtube.com/watch?v=xlcyVMInKPA',
      thumbnail: 'https://img.youtube.com/vi/xlcyVMInKPA/hqdefault.jpg',
    },
    {
      id: 3,
      title:
        'Calistenia Believe - Treino de Tríceps com Peso do Corpo (Avançado)',
      description: 'Treino de Tríceps Avançado',
      url: 'https://www.youtube.com/watch?v=GsTz9HVZsBo',
      thumbnail: 'https://img.youtube.com/vi/GsTz9HVZsBo/hqdefault.jpg',
    },
    {
      id: 4,
      title: 'Treino Calistenia Full Body SUPER AVANÇADO - Double Destruction!',
      description: 'Treino Full Body Super Avançado',
      url: 'https://www.youtube.com/watch?v=D6EMtjo71dA',
      thumbnail: 'https://img.youtube.com/vi/D6EMtjo71dA/hqdefault.jpg',
    },
  ];

  async function getTutorials() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tutorial/getAllTutorials');
      console.log('Resposta da API:', response.data);

      // Verificar o formato da resposta e garantir que tutorials seja um array
      if (Array.isArray(response.data)) {
        setTutorials(response.data);
      } else if (response.data && Array.isArray(response.data.tutorials)) {
        // Se os tutoriais estiverem dentro de uma propriedade 'tutorials'
        setTutorials(response.data.tutorials);
      } else if (response.data && typeof response.data === 'object') {
        // Se a resposta for um objeto, tente extrair os valores como array
        const tutorialsArray = Object.values(response.data);
        if (
          tutorialsArray.length > 0 &&
          tutorialsArray.every((item) => typeof item === 'object')
        ) {
          setTutorials(tutorialsArray);
        } else {
          // Se não conseguir extrair valores válidos, use os vídeos locais
          console.warn('Formato de resposta inesperado, usando vídeos locais');
          setTutorials(fallbackVideos);
          setError('Formato de dados inválido');
        }
      } else {
        // Se nada funcionar, use os vídeos locais
        console.warn('Formato de resposta inesperado, usando vídeos locais');
        setTutorials(fallbackVideos);
        setError('Formato de dados inválido');
      }
    } catch (error) {
      console.error('Erro ao buscar tutoriais:', error);
      setTutorials(fallbackVideos);
      setError('Erro ao carregar tutoriais');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTutorials();
  }, []);

  return (
    <main className="wrapper py-12">
      <div className="flex items-center mb-4">
        <div className="flex justify-between items-center w-full">
          <div>
            <PlayCircle className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="sm:text-4xl text-3xl font-bold">
              Tutoriais de Calistenia
            </h1>
          </div>
          {userData?.role === 'ADMIN' && (
            <Button>
              <Link to="/editar-tutoriais">Editar Conteúdo</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-10"></div>

      <p className="text-zinc-400 text-lg mb-8 max-w-3xl">
        Aprenda as melhores técnicas e exercícios para desenvolver sua força e
        habilidades em calistenia com nossos vídeos selecionados.
      </p>

      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="mt-8 text-center p-6 bg-red-900/20 rounded-lg border border-red-900/30">
          <p className="text-red-400">{error}</p>
          <p className="mt-2 text-zinc-400">
            Mostrando tutoriais disponíveis localmente.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {tutorials && tutorials.length > 0 ? (
              tutorials.map((tutorial, index) => (
                <CardVideo
                  key={tutorial.id || tutorial._id || index}
                  url={tutorial.url}
                  title={tutorial.title}
                  thumbnail={
                    tutorial.thumbnail ||
                    `https://img.youtube.com/vi/${getYoutubeId(tutorial.url)}/hqdefault.jpg`
                  }
                  description={tutorial.description}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p>Nenhum tutorial encontrado.</p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://www.youtube.com/@BelieveCalistenia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Visite nosso canal
            </a>
          </div>
        </>
      )}
    </main>
  );
}

// Função auxiliar para extrair o ID do YouTube de uma URL
function getYoutubeId(url) {
  if (!url) return '';
  // Padrão de regex para extrair o ID do YouTube de várias formas de URL
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}
