import api from '@/api';

// Função utilitária para garantir formato YYYY-MM-DD
const ensureDateFormat = (date) => {
  if (!date) return '';

  // Se já for YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  // Se for dd/mm/yyyy, converter para YYYY-MM-DD
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  // Tenta converter de um objeto Date
  try {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toISOString().split('T')[0];
    }
  } catch (e) {
    console.error('Erro ao converter data:', e);
  }

  return date;
};

export const calendarService = {
  async getEvents() {
    try {
      const response = await api.get('/calendar');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  },

  async updateEvent(id, eventData) {
    try {
      const formData = new FormData();
      const formattedDate = ensureDateFormat(eventData.date);

      formData.append('date', formattedDate);
      formData.append('event_name', eventData.title);
      formData.append('description', eventData.description || '');

      // Se tiver um novo arquivo, adiciona ao FormData
      if (eventData.file) {
        formData.append('event_photo', eventData.file);
      }

      const response = await api.put(`/calendar/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw error;
    }
  },

  async deleteEvent(id) {
    try {
      const response = await api.delete(`/calendar/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      throw error;
    }
  },

  async createEvent(eventData) {
    try {
      const formData = new FormData();
      const formattedDate = ensureDateFormat(eventData.date);

      formData.append('date', formattedDate);
      formData.append('event_name', eventData.title);
      formData.append('description', eventData.description || '');

      // Se tiver um arquivo, adiciona ao FormData
      if (eventData.file) {
        formData.append('event_photo', eventData.file);
      }

      const response = await api.post('/calendar/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  },
};
