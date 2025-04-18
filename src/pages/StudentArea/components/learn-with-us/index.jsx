import { Link } from 'react-router-dom';
import { CardLearnWithUs } from '../ui/CardLearnWithUs';
import { PlayCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/api';
import { toast } from 'sonner';

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
      difficultyLevel: 'BEGINNER',
    },
    {
      id: 2,
      title: 'Como definir o peitoral SEM EQUIPAMENTOS',
      description: 'Treino de Peitoral',
      url: 'https://www.youtube.com/watch?v=xlcyVMInKPA',
      thumbnail: 'https://img.youtube.com/vi/xlcyVMInKPA/hqdefault.jpg',
      difficultyLevel: 'INTERMEDIATE',
    },
    {
      id: 3,
      title: 'Treino de Tríceps com Peso do Corpo (Avançado)',
      description: 'Treino de Tríceps',
      url: 'https://www.youtube.com/watch?v=GsTz9HVZsBo',
      thumbnail: 'https://img.youtube.com/vi/GsTz9HVZsBo/hqdefault.jpg',
      difficultyLevel: 'ADVANCED',
    },
    {
      id: 4,
      title: 'Treino Calistenia Full Body SUPER AVANÇADO',
      description: 'Treino Full Body',
      url: 'https://www.youtube.com/watch?v=D6EMtjo71dA',
      thumbnail: 'https://img.youtube.com/vi/D6EMtjo71dA/hqdefault.jpg',
      difficultyLevel: 'ADVANCED',
    },
  ];

  // Handler para atualizar o tutorial modificado na lista de tutoriais
  const handleTutorialUpdate = (updatedTutorial) => {
    if (!updatedTutorial || !updatedTutorial.id) {
      toast.error('Erro ao atualizar tutorial na lista');
      return;
    }

    setTutorials((currentTutorials) =>
      currentTutorials.map((tutorial) => {
        // Verificar se é o tutorial que foi atualizado (usando id ou _id)
        if (
          (tutorial.id && tutorial.id === updatedTutorial.id) ||
          (tutorial._id && tutorial._id === updatedTutorial.id) ||
          (updatedTutorial._id && tutorial._id === updatedTutorial._id) ||
          (updatedTutorial._id && tutorial.id === updatedTutorial._id)
        ) {
          // Retornar o tutorial atualizado
          return {
            ...tutorial,
            difficultyLevel: updatedTutorial.difficultyLevel,
          };
        }
        return tutorial;
      }),
    );

    toast.success('Lista de tutoriais atualizada!');
  };

  useEffect(() => {
    async function fetchTutorials() {
      setLoading(true);
      try {
        const response = await api.get('/tutorial/getAllTutorials');

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
            setTutorials(fallbackItems);
          }
        } else {
          setTutorials(fallbackItems);
        }
      } catch (error) {
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
        <PlayCircle className="h-8 w-8 text-emerald-500 mr-3" />
        <h2 className="font-bold text-3xl md:text-4xl">
          Aprenda conosco - Tutoriais
        </h2>
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent mb-6"></div>

      <p className="text-zinc-400 text-lg mb-8 max-w-3xl">
        Confira nossos tutoriais exclusivos e aprenda técnicas avançadas de
        calistenia para aprimorar seu treino e performance.
      </p>

      <CardLearnWithUs
        tutorials={tutorials}
        loading={loading}
        onTutorialUpdate={handleTutorialUpdate}
      />

      <Link
        to="/tutoriais"
        className="button self-center mt-8 inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
      >
        <PlayCircle className="mr-2 h-5 w-5" />
        Ver todos os tutoriais
      </Link>
    </div>
  );
}
