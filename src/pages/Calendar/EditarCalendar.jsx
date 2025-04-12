import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { calendarService } from './services/calendarService';
import EventsGrid from './components/EventsGrid';
import EventEditModal from './components/EventEditModal';
import AddEventButton from './components/AddEventButton';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import EventFilter from './components/EventFilter';

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

export default function EditarCalendar() {
  const { userData } = useContext(AuthContext);
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState({
    title: '',
    description: '',
    date: '',
    displayDate: '', // Data formatada para exibição (dd/mm/yyyy)
    event_photo: '',
    file: null,
  });

  async function getCalendar() {
    try {
      setLoading(true);
      const eventos = await calendarService.getEvents();
      // Mapear os campos do backend para o formato usado no frontend
      const eventosFormatados = eventos.map((evento) => {
        // Garantir que a data está no formato correto
        const isoDate = evento.date.split('T')[0]; // Remover parte do tempo

        return {
          id: evento.id,
          title: evento.event_name,
          description: evento.description || '',
          date: isoDate, // Mantém a data original para envio à API
          displayDate: formatDateForDisplay(isoDate), // Data formatada para exibição
          event_photo: evento.event_photo,
        };
      });

      // Ordenar eventos por data (mais recentes primeiro)
      const eventosOrdenados = eventosFormatados.sort((a, b) => {
        // Converte as datas para objetos Date para comparação
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Ordem decrescente (mais recente primeiro)
      });

      setEventos(eventosOrdenados);
      setFilteredEventos(eventosOrdenados);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      toast.error('Não foi possível carregar os eventos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCalendar();
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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditedEvent({
      title: event.title || '',
      description: event.description || '',
      date: event.date || '', // Data original para envio à API (YYYY-MM-DD)
      displayDate: event.displayDate || '', // Data formatada para exibição (dd/mm/yyyy)
      event_photo: event.event_photo || '',
      file: null,
    });
    setDialogOpen(true);
  };

  const handleSaveEvent = async () => {
    try {
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
        ...editedEvent,
        date: apiDate, // Usa a data formatada para a API
      };

      await calendarService.updateEvent(selectedEvent.id, eventToSave);

      // Mostrar toast de sucesso
      toast.success('Evento atualizado com sucesso!');

      setDialogOpen(false);
      getCalendar(); // Recarregar a lista após a edição
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      if (error.response) {
        toast.error(
          `Erro ao salvar: ${error.response.data.error || 'Erro desconhecido'}`,
        );
      } else {
        toast.error(
          'Erro ao salvar o evento. Verifique os dados e tente novamente.',
        );
      }
    }
  };

  const handleDeleteClick = () => {
    // Abrir modal de confirmação de exclusão
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await calendarService.deleteEvent(selectedEvent.id);

      // Fechar os modais
      setDeleteConfirmOpen(false);
      setDialogOpen(false);

      // Mostrar toast de sucesso
      toast.success('Evento excluído com sucesso!');

      getCalendar(); // Recarregar a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      toast.error('Erro ao excluir o evento');
    }
  };

  const handleAddEvent = () => {
    const today = new Date();
    const isoDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    setSelectedEvent(null);
    setEditedEvent({
      title: '',
      description: '',
      date: isoDate, // Data ISO para API
      displayDate: formatDateForDisplay(isoDate), // Data formatada para exibição
      event_photo: '',
      file: null,
    });
    setDialogOpen(true);
  };

  const handleCreateEvent = async () => {
    try {
      // Validar dados antes de enviar
      if (!editedEvent.title) {
        toast.error('Título é obrigatório');
        return;
      }

      // Verificar se temos um arquivo
      if (!editedEvent.file) {
        toast.error('Por favor, selecione uma imagem para o evento');
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
        ...editedEvent,
        date: apiDate, // Usa a data formatada para a API
      };

      'Criando evento com data:', apiDate;
      await calendarService.createEvent(eventToSave);

      // Mostrar toast de sucesso
      toast.success('Evento criado com sucesso!');

      setDialogOpen(false);
      getCalendar(); // Recarregar a lista após a criação
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      if (error.response) {
        toast.error(
          `Erro ao criar: ${error.response.data.error || 'Erro desconhecido'}`,
        );
      } else {
        toast.error(
          'Erro ao criar o evento. Verifique os dados e tente novamente.',
        );
      }
    }
  };

  return (
    <main className="wrapper py-16">
      <h1 className="text-4xl font-bold mb-6">Editar Calendário</h1>

      {/* Filtro e contador de eventos */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <EventFilter filter={filter} setFilter={setFilter} />
        <div className="text-sm text-neutral-400">
          {filteredEventos.length} evento(s) encontrado(s)
        </div>
      </div>

      {/* Grid com botão de adicionar e fotos alinhados */}
      <div className="flex flex-wrap gap-4">
        {/* Botão de adicionar evento */}
        <AddEventButton onClick={handleAddEvent} />

        {/* Grid de eventos */}
        <EventsGrid
          eventos={filteredEventos}
          loading={loading}
          onEventClick={handleEventClick}
        />
      </div>

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
    </main>
  );
}
