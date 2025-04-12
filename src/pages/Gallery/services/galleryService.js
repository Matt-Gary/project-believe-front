import api from '@/api';
import axios from 'axios';

// Função utilitária para garantir formato de data correto
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

export const galleryService = {
  // Buscar todos os eventos da galeria
  async getEvents() {
    try {
      const response = await api.get('/gallery/events');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos da galeria:', error);
      throw error;
    }
  },

  // Buscar um evento específico
  async getEvent(id) {
    try {
      const response = await api.get(`/gallery/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar evento ${id}:`, error);
      throw error;
    }
  },

  // Buscar fotos de um evento específico
  async getEventPhotos(id) {
    try {
      const response = await api.get(`/gallery/events/${id}/photos`);

      // Verificar se a resposta tem a estrutura esperada
      if (response.data && response.data.photos) {
        return response.data.photos;
      } else if (Array.isArray(response.data)) {
        // Se a resposta for um array direto
        return response.data;
      } else if (response.data && Array.isArray(response.data.event?.photos)) {
        // Se a resposta contiver um objeto evento com array de fotos
        return response.data.event.photos;
      } else {
        console.warn(
          'Formato de resposta inesperado ao buscar fotos:',
          response.data,
        );
        return []; // Retornar array vazio em vez de falhar
      }
    } catch (error) {
      console.error(`Erro ao buscar fotos do evento ${id}:`, error);
      return []; // Retornar array vazio em vez de falhar
    }
  },

  // Criar um novo evento
  async createEvent(eventData) {
    try {
      // Formatando a data para o formato esperado pela API (YYYY-MM-DD)
      const formattedDate = ensureDateFormat(eventData.date);

      // Criando payload conforme a API
      // A API espera apenas: name, description, event_date (sem arquivos)
      const payload = {
        name: eventData.title,
        description: eventData.description || '',
        event_date: formattedDate,
      };

      // Enviar dados para criar o evento
      const response = await api.post('/gallery/events', payload);
      'Resposta da API ao criar evento:', response.data;

      // Se temos um arquivo e o evento foi criado com sucesso, enviar a foto em uma segunda requisição
      if (
        eventData.file &&
        response.data &&
        response.data.event &&
        response.data.event[0] &&
        response.data.event[0].id
      ) {
        const eventId = response.data.event[0].id;

        // Criar FormData para o upload da foto
        const formData = new FormData();
        formData.append('photos', eventData.file);

        try {
          // Upload da foto para o evento recém-criado usando a rota específica para fotos
          const photoResponse = await axios.post(
            `https://www.api.believecalistenia.com.br/gallery/events/${eventId}/photos`,
            formData,
            {
              withCredentials: true,
            },
          );

          // Retornar os dados completos
          return {
            ...response.data,
            photoUpload: photoResponse.data,
          };
        } catch (photoErr) {
          console.error('Erro ao adicionar foto ao evento:', photoErr);
          // Mesmo com erro no upload da foto, retornamos os dados do evento criado
          return response.data;
        }
      }

      return response.data;
    } catch (error) {
      console.error('Erro geral ao criar evento:', error);
      console.error('Detalhes:', error.response?.data || 'Sem detalhes');
      throw error;
    }
  },

  // Atualizar um evento existente
  async updateEvent(id, eventData) {
    try {
      // Formatar a data corretamente
      const formattedDate = ensureDateFormat(eventData.date);

      // Ajustar para o formato exato que a API espera
      const payload = {
        id: id,
        name: eventData.title,
        description: eventData.description || '',
        event_date: formattedDate,
      };

      'Payload para atualização:', payload;

      // Primeiro atualizamos as informações básicas do evento
      const response = await api.post('/gallery/events', payload);

      // Se temos um arquivo, fazemos o upload em uma requisição separada
      if (eventData.file) {
        const formData = new FormData();
        formData.append('photos', eventData.file);

        try {
          // Upload da foto para o evento utilizando a rota específica para fotos
          const photoResponse = await axios.post(
            `https://www.api.believecalistenia.com.br/gallery/events/${id}/photos`,
            formData,
            {
              withCredentials: true,
            },
          );

          // Retornar os dados completos
          return {
            ...response.data,
            photoUpload: photoResponse.data,
          };
        } catch (photoErr) {
          console.error(
            'Erro ao adicionar foto ao evento atualizado:',
            photoErr,
          );
          // Mesmo com erro no upload da foto, retornamos os dados do evento atualizado
          return response.data;
        }
      }

      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar evento ${id}:`, error);
      console.error('Detalhes:', error.response?.data || 'Sem detalhes');
      throw error;
    }
  },

  // Excluir um evento
  async deleteEvent(id) {
    try {
      const response = await api.delete(`/gallery/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir evento ${id}:`, error);
      throw error;
    }
  },

  // Adicionar fotos a um evento
  async addPhotosToEvent(eventId, files) {
    try {
      const formData = new FormData();

      // Adicionar cada arquivo ao formData
      for (let i = 0; i < files.length; i++) {
        formData.append('photos', files[i]);
      }

      // Usando axios diretamente para o upload de múltiplos arquivos
      const response = await axios.post(
        `https://www.api.believecalistenia.com.br/gallery/events/${eventId}/photos`,
        formData,
        {
          withCredentials: true,
          // Não definir Content-Type explicitamente
        },
      );

      return response.data;
    } catch (error) {
      console.error(`Erro ao adicionar fotos ao evento ${eventId}:`, error);
      throw error;
    }
  },

  // Excluir uma foto
  async deletePhoto(photoId) {
    try {
      const response = await api.delete(`/gallery/photos/${photoId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir foto ${photoId}:`, error);
      throw error;
    }
  },

  // Alterar a visibilidade de uma foto (público/privado)
  async togglePhotoVisibility(photoId, currentVisibility) {
    try {
      // O novo estado de visibilidade é o oposto do atual
      const newVisibility =
        currentVisibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';

      const response = await api.put(`/gallery/photos/${photoId}/visibility`, {
        visibility: newVisibility,
      });

      return {
        ...response.data,
        newVisibility,
      };
    } catch (error) {
      console.error(`Erro ao alterar visibilidade da foto ${photoId}:`, error);
      throw error;
    }
  },
};
