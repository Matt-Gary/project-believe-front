import { Link } from 'react-router-dom';
import { CardLearnWithUs } from '../ui/CardLearnWithUs';
import { PlayCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/api';

export function LearnWithUs() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Array de vídeos fallback se a API falhar
  const fallbackItems = [
    {
      id: 1,
      title: 'Como Começar a Treinar Abdômen da Forma Correta',
      description: 'Treino de Abdômen',
      url: 'https://www.youtube.com/watch?v=Lkb_0g4ThXE',
      thumbnail: 'https://img.youtube.com/vi/Lkb_0g4ThXE/hqdefault.jpg',
    },
    {
      id: 2,
      title: 'Como definir o peitoral SEM EQUIPAMENTOS',
      description: 'Treino de Peitoral',
      url: 'https://www.youtube.com/watch?v=xlcyVMInKPA',
      thumbnail: 'https://img.youtube.com/vi/xlcyVMInKPA/hqdefault.jpg',
    },
    {
      id: 3,
      title: 'Treino de Tríceps com Peso do Corpo (Avançado)',
      description: 'Treino de Tríceps',
      url: 'https://www.youtube.com/watch?v=GsTz9HVZsBo',
      thumbnail: 'https://img.youtube.com/vi/GsTz9HVZsBo/hqdefault.jpg',
    },
    {
      id: 4,
      title: 'Treino Calistenia Full Body SUPER AVANÇADO',
      description: 'Treino Full Body',
      url: 'https://www.youtube.com/watch?v=D6EMtjo71dA',
      thumbnail: 'https://img.youtube.com/vi/D6EMtjo71dA/hqdefault.jpg',
    },
  ];

  useEffect(() => {
    async function fetchTutorials() {
      setLoading(true);
      try {
        const response = await api.get('/tutorial/getAllTutorials');
        console.log('Tutoriais carregados na LearnWithUs:', response.data);

        // Verificar formato dos dados
        if (Array.isArray(response.data)) {
          setTutorials(response.data.slice(0, 5)); // Limitar a 5 tutoriais para o carrossel
        } else if (response.data && Array.isArray(response.data.tutorials)) {
          setTutorials(response.data.tutorials.slice(0, 5));
        } else if (response.data && typeof response.data === 'object') {
          const tutorialsArray = Object.values(response.data);
          if (
            tutorialsArray.length > 0 &&
            tutorialsArray.every((item) => typeof item === 'object')
          ) {
            setTutorials(tutorialsArray.slice(0, 5));
          } else {
            console.warn('Formato inesperado, usando fallback');
            setTutorials(fallbackItems);
          }
        } else {
          console.warn('Formato inesperado, usando fallback');
          setTutorials(fallbackItems);
        }
      } catch (error) {
        console.error('Erro ao buscar tutoriais:', error);
        setTutorials(fallbackItems);
      } finally {
        setLoading(false);
      }
    }

    fetchTutorials();
  }, []);

  return (
    <div className="wrapper mx-auto py-16 flex flex-col">
      <div className="flex items-center mb-4">
        <PlayCircle className="h-8 w-8 text-blue-500 mr-3" />
        <h2 className="font-bold text-3xl md:text-4xl">
          Aprenda conosco - Tutoriais
        </h2>
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-6"></div>

      <p className="text-zinc-400 text-lg mb-8 max-w-3xl">
        Confira nossos tutoriais exclusivos e aprenda técnicas avançadas de
        calistenia para aprimorar seu treino e performance.
      </p>

      <CardLearnWithUs tutorials={tutorials} loading={loading} />

      <Link
        to="/tutoriais"
        className="button self-center mt-8 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        <PlayCircle className="mr-2 h-5 w-5" />
        Ver todos os tutoriais
      </Link>
    </div>
  );
}
