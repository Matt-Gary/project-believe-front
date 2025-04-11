import api from '@/api';

export const beneficiosService = {
  async getBeneficios() {
    try {
      const response = await api.get('/benefits');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar benefícios:', error);
      throw error;
    }
  },

  async updateBeneficio(id, beneficioData) {
    try {
      // Se temos um logo como arquivo, usamos FormData
      if (beneficioData.file) {
        const formData = new FormData();

        // Incluir os dados dos campos
        formData.append('companyName', beneficioData.companyName);
        formData.append('companyEmail', beneficioData.companyEmail);
        formData.append('discount', beneficioData.discount);
        formData.append('description', beneficioData.description);
        formData.append('phoneNumber', beneficioData.phoneNumber || '');

        // Primeiro atualizamos os dados
        await api.put(`/benefits/${id}`, {
          companyName: beneficioData.companyName,
          companyEmail: beneficioData.companyEmail,
          discount: beneficioData.discount,
          description: beneficioData.description,
          phoneNumber: beneficioData.phoneNumber || '',
        });

        // Depois atualizamos o logo em uma chamada separada
        formData.append('logo', beneficioData.file);

        const response = await api.post(
          `/benefits/update-logo/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        return response.data;
      } else {
        // Se não temos logo, apenas atualizamos os dados
        const response = await api.put(`/benefits/${id}`, {
          companyName: beneficioData.companyName,
          companyEmail: beneficioData.companyEmail,
          discount: beneficioData.discount,
          description: beneficioData.description,
          phoneNumber: beneficioData.phoneNumber || '',
        });

        return response.data;
      }
    } catch (error) {
      console.error('Erro ao atualizar benefício:', error);
      throw error;
    }
  },

  async deleteBeneficio(id) {
    try {
      const response = await api.delete(`/benefits/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir benefício:', error);
      throw error;
    }
  },

  async createBeneficio(beneficioData) {
    try {
      // Primeiro criamos o benefício
      const response = await api.post('/benefits', {
        companyName: beneficioData.companyName,
        companyEmail: beneficioData.companyEmail,
        discount: beneficioData.discount,
        description: beneficioData.description,
        phoneNumber: beneficioData.phoneNumber || '',
      });

      const newBeneficioId = response.data.id;

      // Se temos um logo, fazemos upload em uma segunda chamada
      if (beneficioData.file) {
        const formData = new FormData();
        formData.append('logo', beneficioData.file);

        await api.post(`/benefits/update-logo/${newBeneficioId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      return response.data;
    } catch (error) {
      console.error('Erro ao criar benefício:', error);
      throw error;
    }
  },

  async deleteLogo(id) {
    try {
      const response = await api.delete(`/benefits/delete-logo/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir logo:', error);
      throw error;
    }
  },
};
