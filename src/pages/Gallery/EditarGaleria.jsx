import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { galleryService } from './services/galleryService';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventsGrid from './components/EventsGrid';
import AddEventButton from './components/AddEventButton';
import EventEditModal from './components/EventEditModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import EventFilter from './components/EventFilter';
import PhotosGrid from './components/PhotosGrid';
import UploadPhotosForm from './components/UploadPhotosForm';

// Função para formatar a data ISO para dd/mm/yyyy
const formatDateForDisplay = (isoDate) => {
  if (!isoDate) return '';

  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Erro ao formatar data para exibição:', error);
    return '';
  }
};

// Função para converter dd/mm/yyyy para formato ISO (YYYY-MM-DD)
const formatDateForAPI = (displayDate) => {
  if (!displayDate || !displayDate.includes('/')) return '';

  const parts = displayDate.split('/');
  if (parts.length !== 3) return '';

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

export function EditarGaleria() {
  const { userData } = useContext(AuthContext);
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    title: '',
    description: '',
    date: '',
    displayDate: '',
    event_photo: '',
    file: null,
  });

  // Buscar eventos da galeria
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventosData = await galleryService.getEvents();

      // Mapear os campos do backend para o formato usado no frontend
      const eventosFormatados = eventosData.map((evento) => {
        return {
          id: evento.id,
          title: evento.name,
          description: evento.description || '',
          date: evento.event_date,
          displayDate: formatDateForDisplay(evento.event_date),
          event_photo: evento.photos?.[0]?.photo_url || '',
          photos: evento.photos || [],
        };
      });

      // Ordenar eventos por data (mais recentes primeiro)
      const eventosOrdenados = eventosFormatados.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Ordem decrescente
      });

      setEventos(eventosOrdenados);
      setFilteredEventos(eventosOrdenados);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      toast.error('Não foi possível carregar os eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filtrar eventos quando o filtro mudar
  useEffect(() => {
    if (!filter.trim()) {
      setFilteredEventos(eventos);
      return;
    }

    const lowerFilter = filter.toLowerCase();
    const filtered = eventos.filter(
      (evento) =>
        evento.title.toLowerCase().includes(lowerFilter) ||
        evento.description.toLowerCase().includes(lowerFilter) ||
        evento.displayDate.includes(lowerFilter),
    );

    setFilteredEventos(filtered);
  }, [filter, eventos]);

  // Função para lidar com a seleção de um evento
  const handleEventClick = async (event) => {
    try {
      setLoading(true);
      setSelectedEvent(event);
      setEditedEvent({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        displayDate: event.displayDate || '',
        event_photo: event.event_photo || '',
        file: null,
      });

      // Buscar fotos do evento

      const photos = await galleryService.getEventPhotos(event.id);

      // Verificar se temos fotos
      if (photos && Array.isArray(photos)) {
        `Encontradas ${photos.length} fotos para o evento`;
        setSelectedPhotos(photos);
      } else {
        console.log('Nenhuma foto encontrada para o evento');
        setSelectedPhotos([]);
      }

      setShowPhotos(true);
    } catch (error) {
      console.error('Erro ao buscar fotos do evento:', error);
      // Ainda mostramos os detalhes do evento, mesmo sem fotos
      setSelectedPhotos([]);
      setShowPhotos(true);
      toast.error(
        'Não foi possível carregar as fotos deste evento, mas você ainda pode visualizar seus detalhes',
      );
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar as alterações em um evento
  const handleSaveEvent = async () => {
    try {
      console.log('Iniciando atualização do evento:', editedEvent);

      // Validar dados antes de enviar
      if (!editedEvent.title || !editedEvent.displayDate) {
        toast.error('Título e data são obrigatórios');
        return;
      }

      // Garantir que a data está no formato correto para a API
      let apiDate = editedEvent.date;

      // Se a data não estiver no formato correto, converta-a
      if (!apiDate || !/^\d{4}-\d{2}-\d{2}$/.test(apiDate)) {
        apiDate = formatDateForAPI(editedEvent.displayDate);
        if (!apiDate) {
          toast.error('Formato de data inválido. Use o formato DD/MM/AAAA.');
          return;
        }
      }

      // Criar uma cópia do evento para envio
      const eventToSave = {
        title: editedEvent.title,
        description: editedEvent.description || '',
        date: apiDate,
        file: editedEvent.file,
      };

      console.log('Enviando atualização para:', selectedEvent.id, eventToSave);

      // Mostrar toast de carregamento
      const loadingToast = toast.loading('Atualizando evento...');

      try {
        // Atualizar o evento
        const result = await galleryService.updateEvent(
          selectedEvent.id,
          eventToSave,
        );
        console.log('Resposta da atualização:', result);

        // Verificar resultado
        if (result) {
          toast.dismiss(loadingToast);

          if (eventToSave.file && result.photoUpload) {
            toast.success('Evento e foto atualizados com sucesso!');
          } else if (eventToSave.file) {
            toast.success(
              'Evento atualizado com sucesso! Porém houve um problema ao enviar a nova foto.',
            );
          } else {
            toast.success('Evento atualizado com sucesso!');
          }

          setDialogOpen(false);

          // Se estávamos visualizando o evento, voltar à lista
          if (showPhotos) {
            setShowPhotos(false);
            setSelectedEvent(null);
          }

          fetchEvents(); // Recarregar a lista após a edição
        } else {
          toast.dismiss(loadingToast);
          toast.warning(
            'Evento pode ter sido atualizado, mas a resposta da API foi inesperada.',
          );
          setDialogOpen(false);
          fetchEvents();
        }
      } catch (apiError) {
        toast.dismiss(loadingToast);
        toast.error(
          `Erro ao atualizar o evento: ${apiError.message || 'Verifique os dados e tente novamente'}`,
        );
        console.error('Detalhes do erro de atualização:', apiError);
      }
    } catch (error) {
      console.error('Erro geral ao atualizar evento:', error);
      toast.error('Erro inesperado ao atualizar. Por favor, tente novamente.');
    }
  };

  // Função para excluir um evento
  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await galleryService.deleteEvent(selectedEvent.id);

      // Fechar os modais
      setDeleteConfirmOpen(false);
      setDialogOpen(false);
      setShowPhotos(false);

      // Mostrar toast de sucesso
      toast.success('Evento excluído com sucesso!');

      fetchEvents(); // Recarregar a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      toast.error('Erro ao excluir o evento');
    }
  };

  // Função para adicionar um novo evento
  const handleAddEvent = () => {
    console.log('Abrindo modal para adicionar evento');
    const today = new Date();
    const isoDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    setSelectedEvent(null);
    setEditedEvent({
      title: '',
      description: '',
      date: isoDate,
      displayDate: formatDateForDisplay(isoDate),
      event_photo: '',
      file: null,
    });

    // Garantir que o modal seja aberto
    setTimeout(() => {
      setDialogOpen(true);
      console.log('Estado do diálogo definido como:', true);
    }, 0);
  };

  // Função para criar um novo evento
  const handleCreateEvent = async () => {
    try {
      console.log('Iniciando criação de evento com:', editedEvent);

      // Validar dados antes de enviar
      if (!editedEvent.title) {
        toast.error('Título é obrigatório');
        return;
      }

      // Garantir que a data está no formato correto para a API
      let apiDate = editedEvent.date;

      // Se a data não estiver no formato correto, converta-a
      if (!apiDate || !/^\d{4}-\d{2}-\d{2}$/.test(apiDate)) {
        apiDate = formatDateForAPI(editedEvent.displayDate);
        if (!apiDate) {
          toast.error('Formato de data inválido. Use o formato DD/MM/AAAA.');
          return;
        }
      }

      // Criar uma cópia do evento para envio, com os campos exatamente como a API espera
      const eventToSave = {
        title: editedEvent.title, // Será mapeado para 'name' no serviço
        description: editedEvent.description || '',
        date: apiDate, // Será mapeado para 'event_date' no serviço
        file: editedEvent.file, // Será enviado como 'photos' em uma requisição separada
      };

      console.log('Enviando dados para API:', {
        title: eventToSave.title,
        description: eventToSave.description,
        date: eventToSave.date,
        fileIncluded: eventToSave.file ? 'Sim' : 'Não',
      });

      // Mostrar toast de carregamento
      const loadingToast = toast.loading('Criando evento...');

      try {
        // Primeiro passo: criar o evento
        const result = await galleryService.createEvent(eventToSave);
        console.log('Resposta da API:', result);

        // Verificar o resultado
        if (result && result.event) {
          // Atualizar toast para sucesso
          toast.dismiss(loadingToast);

          if (eventToSave.file && result.photoUpload) {
            toast.success('Evento e foto criados com sucesso!');
          } else if (eventToSave.file) {
            toast.success(
              'Evento criado com sucesso! Porém houve um problema ao enviar a foto.',
            );
          } else {
            toast.success('Evento criado com sucesso!');
          }

          setDialogOpen(false);
          fetchEvents(); // Recarregar a lista após a criação
        } else {
          // Resposta inesperada
          toast.dismiss(loadingToast);
          toast.warning('Evento criado, mas a resposta da API foi inesperada.');
          setDialogOpen(false);
          fetchEvents();
        }
      } catch (apiError) {
        // Atualizar toast para erro
        toast.dismiss(loadingToast);
        toast.error(
          `Erro ao criar o evento: ${apiError.message || 'Verifique os dados e tente novamente'}`,
        );
        console.error('Detalhes do erro API:', apiError);
      }
    } catch (error) {
      console.error('Erro geral ao criar evento:', error);
      toast.error('Erro inesperado. Por favor, tente novamente.');
    }
  };

  // Função para excluir uma foto
  const handleDeletePhoto = async (photoId) => {
    if (
      !confirm(
        'Tem certeza que deseja excluir esta foto? Esta ação não pode ser desfeita.',
      )
    ) {
      return;
    }

    try {
      await galleryService.deletePhoto(photoId);

      // Remover a foto do estado local
      setSelectedPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoId),
      );

      toast.success('Foto excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir foto:', error);
      toast.error('Não foi possível excluir a foto');
    }
  };

  // Função para alternar a visibilidade de uma foto (pública/privada)
  const handleToggleVisibility = async (photoId, currentVisibility) => {
    try {
      const loadingToast = toast.loading('Alterando visibilidade...');

      const result = await galleryService.togglePhotoVisibility(
        photoId,
        currentVisibility,
      );

      // Atualizar o estado local com a nova visibilidade
      setSelectedPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === photoId
            ? { ...photo, visibility: result.newVisibility }
            : photo,
        ),
      );

      toast.dismiss(loadingToast);
      toast.success(
        `Foto definida como ${result.newVisibility === 'PUBLIC' ? 'pública' : 'privada'}.`,
      );
    } catch (error) {
      console.error('Erro ao alterar visibilidade:', error);
      toast.error('Não foi possível alterar a visibilidade da foto');
    }
  };

  // Função para adicionar fotos a um evento
  const handleAddPhotos = async (eventId, files) => {
    try {
      await galleryService.addPhotosToEvent(eventId, files);

      // Recarregar as fotos do evento
      const photos = await galleryService.getEventPhotos(eventId);
      setSelectedPhotos(photos || []);

      toast.success('Fotos adicionadas com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar fotos:', error);
      toast.error('Não foi possível adicionar as fotos');
    }
  };

  // Função para voltar à lista de eventos
  const handleBackToEvents = () => {
    setShowPhotos(false);
    setSelectedEvent(null);
    setSelectedPhotos([]);
  };

  const handleEditEvent = () => {
    setDialogOpen(true);
  };

  return (
    <main className="wrapper py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link to="/galeria" className="mr-2">
          <ArrowLeft className="bg-zinc-700 hover:bg-zinc-600 duration-300 rounded-full p-1" />
        </Link>
        <h1 className="text-4xl font-bold">Gerenciar Galeria</h1>
      </div>

      {!userData || userData.role !== 'ADMIN' ? (
        <div className="text-center p-8 bg-red-900/30 rounded-lg">
          <p className="text-xl">
            Acesso negado. Esta área é restrita a administradores.
          </p>
        </div>
      ) : (
        <>
          {showPhotos && selectedEvent ? (
            // Mostrar detalhes e fotos de um evento específico
            <div>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleBackToEvents}
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para eventos
                </button>
                <button
                  onClick={handleEditEvent}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  Editar Evento
                </button>
              </div>

              <div className="bg-zinc-800/50 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-4">
                  {selectedEvent.event_photo && (
                    <img
                      src={selectedEvent.event_photo}
                      alt={selectedEvent.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-zinc-400">{selectedEvent.displayDate}</p>
                    <p className="mt-2">
                      {selectedEvent.description || 'Sem descrição'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulário de upload de fotos */}
              <UploadPhotosForm
                onUpload={handleAddPhotos}
                eventId={selectedEvent.id}
              />

              {/* Grid de fotos */}
              <div className="my-6">
                <h3 className="text-xl font-semibold mb-4">
                  Fotos do evento ({selectedPhotos.length})
                </h3>
                <PhotosGrid
                  photos={selectedPhotos}
                  onDeletePhoto={handleDeletePhoto}
                  onToggleVisibility={handleToggleVisibility}
                />
              </div>
            </div>
          ) : (
            // Mostrar lista de eventos
            <>
              {/* Filtro e contador de eventos */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <EventFilter filter={filter} setFilter={setFilter} />
                <div className="text-sm text-neutral-400">
                  {filteredEventos.length} evento(s) encontrado(s)
                </div>
              </div>

              {/* Grid com botão de adicionar e eventos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Botão de adicionar evento */}
                <AddEventButton onClick={handleAddEvent} />

                {/* Eventos */}
                {filteredEventos.map((evento) => (
                  <div
                    key={evento.id}
                    className="bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:bg-zinc-700 transition-colors duration-300 group"
                    onClick={() => handleEventClick(evento)}
                  >
                    <div className="relative h-36">
                      {evento.event_photo ? (
                        <img
                          src={evento.event_photo}
                          alt={evento.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                          <span className="text-zinc-400">Sem imagem</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-zinc-900/80 text-white text-xs px-2 py-1 rounded">
                        {evento.displayDate}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-white text-lg truncate">
                        {evento.title}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2 mt-1">
                        {evento.description || 'Sem descrição'}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-zinc-500">
                          {evento.photos?.length || 0} foto(s)
                        </span>
                        <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Editar evento
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Modal de edição de evento */}
          <EventEditModal
            isOpen={dialogOpen}
            setIsOpen={setDialogOpen}
            selectedEvent={selectedEvent}
            editedEvent={editedEvent}
            setEditedEvent={setEditedEvent}
            onSave={selectedEvent ? handleSaveEvent : handleCreateEvent}
            onDelete={handleDeleteClick}
          />

          {/* Modal de confirmação de exclusão */}
          {selectedEvent && (
            <DeleteConfirmationModal
              isOpen={deleteConfirmOpen}
              setIsOpen={setDeleteConfirmOpen}
              onConfirm={handleDeleteConfirm}
              eventTitle={selectedEvent.title}
            />
          )}
        </>
      )}
    </main>
  );
}
