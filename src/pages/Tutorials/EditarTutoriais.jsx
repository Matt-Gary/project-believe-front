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
    difficultyLevel: 'Iniciante',
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

  async function getTutorials() {
    setLoading(true);
    try {
      const response = await api.get('/tutorial/getAllTutorials');
      console.log('Tutoriais carregados:', response.data);

      // Verificar formato dos dados retornados
      if (Array.isArray(response.data)) {
        setTutorials(response.data);
      } else if (response.data && Array.isArray(response.data.tutorials)) {
        setTutorials(response.data.tutorials);
      } else if (response.data && typeof response.data === 'object') {
        const tutorialsArray = Object.values(response.data);
        if (
          tutorialsArray.length > 0 &&
          tutorialsArray.every((item) => typeof item === 'object')
        ) {
          setTutorials(tutorialsArray);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar tutoriais:', error);
      toast.error('Erro ao carregar os tutoriais');
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

  // Abrir o dialog para criar novo tutorial
  const handleAddNew = () => {
    setIsEditing(false);
    setSelectedTutorial(null);
    setEditedTutorial({
      title: '',
      description: '',
      url: '',
      thumbnail: '',
      difficultyLevel: 'Iniciante',
    });
    setDialogOpen(true);
  };

  // Abrir o dialog para editar tutorial existente
  const handleEdit = (tutorial) => {
    setIsEditing(true);
    setSelectedTutorial(tutorial);
    setEditedTutorial({
      title: tutorial.title,
      description: tutorial.description || '',
      url: tutorial.url,
      thumbnail: tutorial.thumbnail || generateThumbnail(tutorial.url),
      difficultyLevel: tutorial.difficultyLevel || 'Iniciante',
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

      const tutorialToSave = {
        title: editedTutorial.title,
        description: editedTutorial.description || '',
        url: editedTutorial.url,
        difficultyLevel: editedTutorial.difficultyLevel,
      };

      // Mostrar toast de carregamento
      const loadingToast = toast.loading(
        isEditing ? 'Atualizando tutorial...' : 'Criando tutorial...',
      );

      if (isEditing && selectedTutorial) {
        // Atualizar tutorial existente
        // Garantir que o ID é uma string para evitar o erro "id.trim is not a function"
        const id = String(selectedTutorial.id || selectedTutorial._id);

        await api.put('/tutorial/updateById', {
          id,
          ...tutorialToSave,
        });
        toast.dismiss(loadingToast);
        toast.success('Tutorial atualizado com sucesso!');
      } else {
        // Criar novo tutorial
        await api.post('/tutorial/create', tutorialToSave);
        toast.dismiss(loadingToast);
        toast.success('Tutorial criado com sucesso!');
      }

      // Fechar o dialog e recarregar a lista
      setDialogOpen(false);
      getTutorials();
    } catch (error) {
      console.error('Erro ao salvar tutorial:', error);
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

      await api.delete('/tutorial/deleteById', {
        data: { id },
      });

      toast.dismiss(loadingToast);
      toast.success('Tutorial excluído com sucesso!');

      // Fechar diálogo e atualizar lista
      setDeleteConfirmOpen(false);
      getTutorials();
    } catch (error) {
      console.error('Erro ao excluir tutorial:', error);
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
          <PlayCircle className="h-8 w-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold">Gerenciar Tutoriais</h1>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Tutorial
        </Button>
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8"></div>

      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                      className="bg-blue-600 hover:bg-blue-700 text-white hover:text-zinc-100 border-blue-600"
                      onClick={() => handleEdit(tutorial)}
                    >
                      <Pencil className="hover:text-zinc-100 text-zinc-100 mr-2 h-4 w-4" />{' '}
                      Editar
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
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
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar o primeiro tutorial
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Dialog para adicionar/editar tutorial */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar Tutorial' : 'Adicionar Novo Tutorial'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
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
                rows={3}
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
              <Label htmlFor="difficultyLevel">Nível de Dificuldade</Label>
              <select
                id="difficultyLevel"
                name="difficultyLevel"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white"
                value={editedTutorial.difficultyLevel}
                onChange={handleInputChange}
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>

            {editedTutorial.thumbnail && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Thumbnail Preview:</p>
                <img
                  src={editedTutorial.thumbnail}
                  alt="Thumbnail preview"
                  className="max-h-36 rounded-md"
                />
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
              className="bg-blue-600 hover:bg-blue-700 text-white"
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
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
