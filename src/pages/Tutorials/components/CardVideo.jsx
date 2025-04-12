import { Play } from 'lucide-react';

export function CardVideo({
  url,
  title,
  description,
  thumbnail,
  duration,
  difficultyLevel,
}) {
  // Extrair ID do YouTube da URL para usar com a API posteriormente
  function getYoutubeId(url) {
    if (!url) return '';
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  // Gerar um tempo aleatório para simulação (entre 5 e 15 minutos)
  const randomDuration = () => {
    const minutes = Math.floor(Math.random() * 10) + 5;
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Função para traduzir o nível de dificuldade para português
  function translateDifficulty(level) {
    switch (level) {
      case 'BEGINNER':
        return 'Iniciante';
      case 'INTERMEDIATE':
        return 'Intermediário';
      case 'ADVANCED':
        return 'Avançado';
      default:
        return 'Iniciante';
    }
  }

  // Função para obter classe de cor baseada no nível de dificuldade
  function getDifficultyColor(level) {
    switch (level) {
      case 'BEGINNER':
        return 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/50';
      case 'INTERMEDIATE':
        return 'bg-amber-900/30 text-amber-400 border border-amber-500/50';
      case 'ADVANCED':
        return 'bg-rose-900/30 text-rose-400 border border-rose-500/50';
      default:
        return 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/50';
    }
  }

  const videoDuration = duration || randomDuration();
  const level = difficultyLevel || 'BEGINNER';

  return (
    <a
      href={url}
      className="max-w-[350px] overflow-hidden bg-zinc-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative overflow-hidden">
        {/* Thumbnail com overlay */}
        <img
          src={thumbnail}
          alt={`Thumbnail do vídeo: ${title}`}
          className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay escuro com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

        {/* Ícone de play centralizado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-emerald-500/80 rounded-full p-3 transform scale-90 group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-600/90">
            <Play className="h-8 w-8 text-white" fill="white" />
          </div>
        </div>

        {/* Duração do vídeo */}
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-medium text-white">
          {videoDuration}
        </div>

        {/* Badge de dificuldade no canto superior direito */}
        <div className="absolute top-2 right-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(level)}`}
          >
            {translateDifficulty(level)}
          </div>
        </div>
      </div>

      {/* Barra colorida */}
      <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <h1 className="font-bold text-lg text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
          {title}
        </h1>
        <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{description}</p>

        {/* Badge de Calistenia */}
        <div className="mt-3 flex items-center">
          <div className="bg-emerald-900/30 text-emerald-400 text-xs px-2 py-1 rounded-full">
            Calistenia
          </div>
          <div className="text-xs text-zinc-500 ml-auto">
            Believe Calistenia
          </div>
        </div>
      </div>
    </a>
  );
}
