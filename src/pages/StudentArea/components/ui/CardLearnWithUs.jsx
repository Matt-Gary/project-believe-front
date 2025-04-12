import { Play, Edit2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import api from '@/api';

// Imagens de fallback
import tutorial1 from '@/assets/about-page-image-1.webp';
import tutorial2 from '@/assets/about-page-image-2.webp';

export function CardLearnWithUs({
  tutorials = [],
  loading = false,
  onTutorialUpdate,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Função para extrair ID do YouTube da URL
  function getYoutubeId(url) {
    if (!url) return '';
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  // Gerar uma duração aleatória
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

  const handleEdit = (tutorial, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTutorial(tutorial);
    setValue('difficultyLevel', tutorial.difficultyLevel || 'BEGINNER');
    setDialogOpen(true);
  };

  const onSubmit = async (data) => {
    if (!selectedTutorial) return;

    try {
      // Obter o ID do tutorial
      const id = selectedTutorial.id || selectedTutorial._id;

      if (!id) {
        toast.error('ID do tutorial não encontrado');
        return;
      }

      // Obter token de autenticação
      const accessToken =
        localStorage.getItem('accessToken') ||
        document.cookie.replace(
          /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
          '$1',
        );

      // Criar payload
      const updatePayload = {
        id: id,
        title: selectedTutorial.title,
        url: selectedTutorial.url,
        description: selectedTutorial.description || '',
        difficultyLevel: data.difficultyLevel,
      };

      // Fazer requisição para atualizar
      const response = await api.put('/tutorial/updateById', updatePayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success('Nível de dificuldade atualizado com sucesso!');
      setDialogOpen(false);

      // Chamar callback para atualizar estado dos tutoriais (se fornecido)
      if (onTutorialUpdate && typeof onTutorialUpdate === 'function') {
        onTutorialUpdate({
          ...selectedTutorial,
          difficultyLevel: data.difficultyLevel,
        });
      }
    } catch (error) {
      toast.error('Erro ao atualizar nível de dificuldade');
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <>
      <Carousel className="w-full py-4">
        <CarouselContent>
          {tutorials.map((tutorial, index) => (
            <CarouselItem
              key={tutorial.id || index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="bg-zinc-800 block h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative">
                <a
                  href={tutorial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative overflow-hidden">
                    {/* Thumbnail */}
                    <img
                      src={
                        tutorial.thumbnail ||
                        `https://img.youtube.com/vi/${getYoutubeId(tutorial.url)}/hqdefault.jpg`
                      }
                      alt={tutorial.title}
                      className="w-full h-52 object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
                      {randomDuration()}
                    </div>

                    {/* Badge de dificuldade no canto superior direito */}
                    <div className="absolute top-2 right-2">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficultyLevel || 'BEGINNER')}`}
                      >
                        {translateDifficulty(
                          tutorial.difficultyLevel || 'BEGINNER',
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Barra colorida */}
                  <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>

                  {/* Conteúdo do card */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                      {tutorial.description}
                    </p>
                  </div>
                </a>
                {/* Botão de edição */}
                <button
                  onClick={(e) => handleEdit(tutorial, e)}
                  className="absolute top-2 left-2 bg-emerald-500/80 hover:bg-emerald-600 text-white rounded-full p-1.5 transition-all duration-300"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex">
          <CarouselPrevious className="left-0 -translate-x-4" />
          <CarouselNext className="right-0 translate-x-4" />
        </div>
      </Carousel>

      {/* Dialog para editar nível de dificuldade */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Editar Nível de Dificuldade</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="difficultyLevel" className="text-sm font-medium">
                Nível de Dificuldade
              </label>
              <div
                className={`border-2 rounded-md p-0.5 ${
                  register('difficultyLevel').value === 'BEGINNER'
                    ? 'border-emerald-500'
                    : register('difficultyLevel').value === 'INTERMEDIATE'
                      ? 'border-amber-500'
                      : register('difficultyLevel').value === 'ADVANCED'
                        ? 'border-rose-500'
                        : 'border-emerald-500'
                }`}
              >
                <select
                  id="difficultyLevel"
                  className="w-full rounded-sm border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-opacity-50"
                  {...register('difficultyLevel', { required: true })}
                >
                  <option value="BEGINNER">Iniciante</option>
                  <option value="INTERMEDIATE">Intermediário</option>
                  <option value="ADVANCED">Avançado</option>
                </select>
              </div>
              {errors.difficultyLevel && (
                <p className="text-xs text-rose-500">
                  Selecione um nível de dificuldade
                </p>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-zinc-700 hover:bg-zinc-600 text-white border-zinc-600"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
