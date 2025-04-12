import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import api from '@/api';

export function FormTutorialDifficultyExample({ tutorial, onUpdateSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      difficultyLevel: tutorial?.difficultyLevel || 'Iniciante',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Verificar se temos um tutorial e um ID
      const id = tutorial?.id || tutorial?._id;
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

      // Criar payload para atualização
      const updatePayload = {
        id: id,
        title: tutorial.title,
        description: tutorial.description || '',
        url: tutorial.url,
        difficultyLevel: data.difficultyLevel,
      };

      // Fazer requisição para atualizar
      const response = await api.put('/tutorial/updateById', updatePayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success('Nível de dificuldade atualizado com sucesso!');

      // Chamar callback se fornecido
      if (onUpdateSuccess && typeof onUpdateSuccess === 'function') {
        onUpdateSuccess({
          ...tutorial,
          difficultyLevel: data.difficultyLevel,
        });
      }
    } catch (error) {
      toast.error('Erro ao atualizar nível de dificuldade');
    }
  };

  // Função para gerar classe de cor para o nível de dificuldade
  function getDifficultyColor(level) {
    switch (level) {
      case 'Iniciante':
        return 'bg-green-900/30 text-green-400';
      case 'Intermediário':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'Avançado':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-blue-900/30 text-blue-400';
    }
  }

  return (
    <div className="p-6 bg-zinc-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">
        Atualizar Nível de Dificuldade
      </h2>

      {tutorial ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="difficultyLevel"
              className="text-sm font-medium text-white"
            >
              Nível de Dificuldade
            </label>
            <div className="border-2 border-blue-500 rounded-md p-0.5">
              <select
                id="difficultyLevel"
                className="w-full rounded-sm border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register('difficultyLevel', {
                  required: 'Este campo é obrigatório',
                })}
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
            {errors.difficultyLevel && (
              <p className="text-xs text-red-500 mt-1">
                {errors.difficultyLevel.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficultyLevel)}`}
            >
              Atual: {tutorial.difficultyLevel || 'Iniciante'}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Atualizando...' : 'Atualizar Nível'}
          </button>
        </form>
      ) : (
        <p className="text-red-400">Nenhum tutorial selecionado</p>
      )}
    </div>
  );
}
