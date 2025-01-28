import { useEffect } from 'react';
import { CardVideo } from './components/CardVideo';

export function Tutorials() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videos = [
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

  return (
    <main className="wrapper py-16">
      <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start">
        Tutoriais
      </h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {videos.map((video) => (
          <CardVideo
            key={video.id}
            url={video.url}
            title={video.title}
            thumbnail={video.thumbnail}
            description={video.description}
          />
        ))}
      </div>
    </main>
  );
}
