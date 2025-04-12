import { useEffect, useState } from 'react';
import { PlayCircle, Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import api from '@/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function EditarTutoriais() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [editedTutorial, setEditedTutorial] = useState({
    title: '',
    description: '',
    url: '',
    thumbnail: '',
    difficultyLevel: 'BEGINNER',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Função para extrair o ID do YouTube da URL
  function getYoutubeId(url) {
    if (!url) return '';
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  // Função para gerar a thumbnail a partir da URL do YouTube
  function generateThumbnail(url) {
    const youtubeId = getYoutubeId(url);
    return youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      : '';
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

  // Função para normalizar o nível de dificuldade
  const normalizeDifficulty = (tutorial) => {
    if (!tutorial) return 'BEGINNER';

    // Verificar diferentes campos possíveis para o nível de dificuldade
    let difficulty;

    if (
      typeof tutorial.difficultyLevel === 'string' &&
      tutorial.difficultyLevel.trim() !== ''
    ) {
      difficulty = tutorial.difficultyLevel;
    } else if (
      typeof tutorial.difficulty_level === 'string' &&
      tutorial.difficulty_level.trim() !== ''
    ) {
      difficulty = tutorial.difficulty_level;
    } else if (
      typeof tutorial.difficulty === 'string' &&
      tutorial.difficulty.trim() !== ''
    ) {
      difficulty = tutorial.difficulty;
    } else if (
      typeof tutorial.level === 'string' &&
      tutorial.level.trim() !== ''
    ) {
      difficulty = tutorial.level;
    } else {
      difficulty = 'BEGINNER';
    }

    // Verificar se é um valor válido
    const validLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
    return validLevels.includes(difficulty) ? difficulty : 'BEGINNER';
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

  async function getTutorials() {
    setLoading(true);
    try {
      // Adicionar token de autenticação no cabeçalho
      const accessToken =
        localStorage.getItem('accessToken') ||
        document.cookie.replace(
          /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
          '$1',
        );

      const response = await api.get('/tutorial/getAllTutorials', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (Array.isArray(response.data)) {
        const tutorialsWithValidDifficulty = response.data.map((tutorial) => ({
          ...tutorial,
          difficultyLevel: normalizeDifficulty(tutorial),
        }));
        setTutorials(tutorialsWithValidDifficulty);
      } else if (response.data && Array.isArray(response.data.tutorials)) {
        const tutorialsWithValidDifficulty = response.data.tutorials.map(
          (tutorial) => ({
            ...tutorial,
            difficultyLevel: normalizeDifficulty(tutorial),
          }),
        );
        setTutorials(tutorialsWithValidDifficulty);
      } else if (response.data && typeof response.data === 'object') {
        const tutorialsArray = Object.values(response.data);
        if (
          tutorialsArray.length > 0 &&
          tutorialsArray.every((item) => typeof item === 'object')
        ) {
          const tutorialsWithValidDifficulty = tutorialsArray.map(
            (tutorial) => ({
              ...tutorial,
              difficultyLevel: normalizeDifficulty(tutorial),
            }),
          );
          setTutorials(tutorialsWithValidDifficulty);
        }
      }
    } catch (error) {
      toast.error('Erro ao carregar os tutoriais. Verifique sua autenticação.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getTutorials();
  }, []);

  // Funções de manipulação do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Se o campo for URL, também atualiza a thumbnail automaticamente
    if (name === 'url') {
      setEditedTutorial((prev) => ({
        ...prev,
        [name]: value,
        thumbnail: generateThumbnail(value),
      }));
    } else {
      setEditedTutorial((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Função específica para lidar com a alteração do nível de dificuldade
  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    setEditedTutorial((prev) => ({
      ...prev,
      difficultyLevel: value,
    }));
  };

  // Abrir o dialog para criar novo tutorial
  const handleAddNew = () => {
    setIsEditing(false);
    setSelectedTutorial(null);
    setEditedTutorial({
      title: '',
      description: '',
      url: '',
      thumbnail: '',
      difficultyLevel: 'BEGINNER',
    });
    setDialogOpen(true);
  };

  // Abrir o dialog para editar tutorial existente
  const handleEdit = (tutorial) => {
    if (!tutorial) return;

    // Garantir que difficultyLevel seja uma string válida
    const validDifficultyLevel = tutorial.difficultyLevel || 'BEGINNER';

    setIsEditing(true);
    setSelectedTutorial(tutorial);
    setEditedTutorial({
      title: tutorial.title || '',
      description: tutorial.description || '',
      url: tutorial.url || '',
      thumbnail: tutorial.thumbnail || generateThumbnail(tutorial.url || ''),
      difficultyLevel: validDifficultyLevel,
    });

    setDialogOpen(true);
  };

  // Abrir o dialog para confirmar exclusão
  const handleDeleteClick = (tutorial) => {
    setSelectedTutorial(tutorial);
    setDeleteConfirmOpen(true);
  };

  // Salvar tutorial (criar ou atualizar)
  const handleSave = async () => {
    try {
      // Validar dados antes de enviar
      if (!editedTutorial.title || !editedTutorial.url) {
        toast.error('Título e URL são obrigatórios');
        return;
      }

      // Verificar se a URL é válida e tem um ID do YouTube
      if (!getYoutubeId(editedTutorial.url)) {
        toast.error('URL do YouTube inválida');
        return;
      }

      // Garantir que temos uma thumbnail, senão gerar a partir da URL
      if (!editedTutorial.thumbnail) {
        editedTutorial.thumbnail = generateThumbnail(editedTutorial.url);
      }

      // Garantir que difficultyLevel seja uma string válida
      const difficultyLevel = editedTutorial.difficultyLevel || 'BEGINNER';

      const tutorialToSave = {
        title: editedTutorial.title,
        description: editedTutorial.description || '',
        url: editedTutorial.url,
        difficultyLevel: difficultyLevel,
      };

      // Adicionar token de autenticação no cabeçalho
      const accessToken =
        localStorage.getItem('accessToken') ||
        document.cookie.replace(
          /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
          '$1',
        );

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Mostrar toast de carregamento
      const loadingToast = toast.loading(
        isEditing ? 'Atualizando tutorial...' : 'Criando tutorial...',
      );

      if (isEditing && selectedTutorial) {
        // Atualizar tutorial existente
        // Verificar os possíveis formatos de ID
        let id;
        if (typeof selectedTutorial.id === 'string') {
          id = selectedTutorial.id;
        } else if (typeof selectedTutorial._id === 'string') {
          id = selectedTutorial._id;
        } else if (selectedTutorial.id) {
          id = String(selectedTutorial.id);
        } else if (selectedTutorial._id) {
          id = String(selectedTutorial._id);
        } else {
          toast.error('ID do tutorial não encontrado');
          return;
        }

        // Garantir que o difficultyLevel é uma string válida
        let validDifficulty = String(difficultyLevel || 'BEGINNER');

        // Verificar se o valor é válido
        const validLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
        if (!validLevels.includes(validDifficulty)) {
          validDifficulty = 'BEGINNER';
        }

        // Criar objeto exatamente como o backend espera
        const updatePayload = {
          id: id,
          title: tutorialToSave.title,
          url: tutorialToSave.url,
          description: tutorialToSave.description || '',
          difficultyLevel: validDifficulty,
        };

        try {
          const response = await api.put(
            '/tutorial/updateById',
            updatePayload,
            config,
          );

          toast.dismiss(loadingToast);
          toast.success('Tutorial atualizado com sucesso!');

          // Atualizar estado local para refletir a mudança imediatamente
          setTutorials((prevTutorials) =>
            prevTutorials.map((t) => {
              if ((t.id && t.id === id) || (t._id && t._id === id)) {
                return {
                  ...t,
                  title: updatePayload.title,
                  description: updatePayload.description,
                  url: updatePayload.url,
                  difficultyLevel: updatePayload.difficultyLevel,
                };
              }
              return t;
            }),
          );

          // Fechar o dialog e recarregar a lista
          setDialogOpen(false);
          getTutorials();
        } catch (error) {
          toast.dismiss(loadingToast);
          toast.error(
            `Erro ao atualizar: ${error.response?.data?.error || error.message}`,
          );
        }
      } else {
        // Criar novo tutorial
        try {
          const response = await api.post(
            '/tutorial/create',
            tutorialToSave,
            config,
          );

          toast.dismiss(loadingToast);
          toast.success('Tutorial criado com sucesso!');

          // Fechar o dialog e recarregar a lista
          setDialogOpen(false);
          getTutorials();
        } catch (error) {
          toast.dismiss(loadingToast);
          toast.error(
            `Erro ao criar: ${error.response?.data?.error || error.message}`,
          );
        }
      }
    } catch (error) {
      toast.error(
        `Erro ao ${isEditing ? 'atualizar' : 'criar'} tutorial: ${
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message
        }`,
      );
    }
  };

  // Excluir tutorial
  const handleDelete = async () => {
    if (!selectedTutorial) return;

    try {
      const loadingToast = toast.loading('Excluindo tutorial...');

      // Garantir que o ID é uma string
      const id = String(selectedTutorial.id || selectedTutorial._id);

      // Adicionar token de autenticação no cabeçalho
      const accessToken =
        localStorage.getItem('accessToken') ||
        document.cookie.replace(
          /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
          '$1',
        );

      await api.delete('/tutorial/deleteById', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { id },
      });

      toast.dismiss(loadingToast);
      toast.success('Tutorial excluído com sucesso!');

      // Fechar diálogo e atualizar lista
      setDeleteConfirmOpen(false);
      getTutorials();
    } catch (error) {
      toast.error(
        `Erro ao excluir tutorial: ${
          error.response?.data?.message || error.message
        }`,
      );
    }
  };

  return (
    <main className="wrapper py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <PlayCircle className="h-8 w-8 text-emerald-500 mr-3" />
          <h1 className="text-3xl font-bold">Gerenciar Tutoriais</h1>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Tutorial
        </Button>
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent mb-8"></div>

      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials && tutorials.length > 0 ? (
            tutorials.map((tutorial) => (
              <div
                key={tutorial.id || tutorial._id}
                className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg border border-zinc-700"
              >
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || generateThumbnail(tutorial.url)}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

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

                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                    {tutorial.description}
                  </p>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white hover:text-zinc-100 border-emerald-600"
                      onClick={() => handleEdit(tutorial)}
                    >
                      <Pencil className="hover:text-zinc-100 text-zinc-100 mr-2 h-4 w-4" />{' '}
                      Editar
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-rose-600 hover:bg-rose-700 text-white"
                      onClick={() => handleDeleteClick(tutorial)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Excluir
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center bg-zinc-800/50 rounded-lg border border-zinc-700">
              <p className="text-zinc-400 mb-4">Nenhum tutorial encontrado.</p>
              <Button
                onClick={handleAddNew}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar o primeiro tutorial
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Dialog para adicionar/editar tutorial */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar Tutorial' : 'Adicionar Novo Tutorial'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-3">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                placeholder="Título do tutorial"
                value={editedTutorial.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Breve descrição do tutorial"
                value={editedTutorial.description}
                onChange={handleInputChange}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL do YouTube</Label>
              <Input
                id="url"
                name="url"
                placeholder="ex: https://www.youtube.com/watch?v=abc123"
                value={editedTutorial.url}
                onChange={handleInputChange}
              />
              <p className="text-xs text-zinc-500">
                Após inserir a URL, a thumbnail será gerada automaticamente
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="difficultyLevel"
                className="text-white font-medium"
              >
                Nível de Dificuldade <span className="text-emerald-400">*</span>
              </Label>
              <div
                className={`border-2 rounded-md p-0.5 ${
                  editedTutorial.difficultyLevel === 'BEGINNER'
                    ? 'border-emerald-500'
                    : editedTutorial.difficultyLevel === 'INTERMEDIATE'
                      ? 'border-amber-500'
                      : editedTutorial.difficultyLevel === 'ADVANCED'
                        ? 'border-rose-500'
                        : 'border-emerald-500'
                }`}
              >
                <select
                  id="difficultyLevel"
                  name="difficultyLevel"
                  className="w-full rounded-sm border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-opacity-50"
                  value={editedTutorial.difficultyLevel || 'BEGINNER'}
                  onChange={handleDifficultyChange}
                >
                  <option value="BEGINNER">Iniciante</option>
                  <option value="INTERMEDIATE">Intermediário</option>
                  <option value="ADVANCED">Avançado</option>
                </select>
              </div>
              <p
                className={`text-xs mt-1 font-medium ${
                  editedTutorial.difficultyLevel === 'BEGINNER'
                    ? 'text-emerald-400'
                    : editedTutorial.difficultyLevel === 'INTERMEDIATE'
                      ? 'text-amber-400'
                      : editedTutorial.difficultyLevel === 'ADVANCED'
                        ? 'text-rose-400'
                        : 'text-emerald-400'
                }`}
              >
                Dificuldade selecionada:{' '}
                <span className="font-bold">
                  {translateDifficulty(
                    editedTutorial.difficultyLevel || 'BEGINNER',
                  )}
                </span>
              </p>
            </div>

            {editedTutorial.thumbnail && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-1">Thumbnail Preview:</p>
                <div className="relative">
                  <img
                    src={editedTutorial.thumbnail}
                    alt="Thumbnail preview"
                    className="max-h-32 rounded-md"
                  />
                  {/* Badge de dificuldade no preview */}
                  <div className="absolute top-2 right-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(editedTutorial.difficultyLevel)}`}
                    >
                      {translateDifficulty(editedTutorial.difficultyLevel)}
                    </div>
                  </div>
                </div>
              </div>
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
              type="button"
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isEditing ? 'Atualizar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para confirmar exclusão */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Tem certeza que deseja excluir o tutorial "
              {selectedTutorial?.title}"?
            </p>
            <p className="text-zinc-400 text-sm mt-2">
              Esta ação não pode ser desfeita.
            </p>
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
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
