import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, FileImage } from 'lucide-react';

// Função utilitária para converter YYYY-MM-DD para dd/mm/yyyy
const formatDateForAPI = (displayDate) => {
  if (!displayDate || !displayDate.includes('/')) return '';

  const parts = displayDate.split('/');
  if (parts.length !== 3) return '';

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

export default function EventEditModal({
  isOpen,
  setIsOpen,
  selectedEvent,
  editedEvent,
  setEditedEvent,
  onSave,
  onDelete,
}) {
  // Função para formatar a máscara de data
  const formatDateInput = (value) => {
    // Remove caracteres não numéricos
    const numbersOnly = value.replace(/\D/g, '');

    // Aplica a formatação dd/mm/yyyy
    if (numbersOnly.length <= 2) {
      return numbersOnly;
    } else if (numbersOnly.length <= 4) {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
    } else {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(
        2,
        4,
      )}/${numbersOnly.slice(4, 8)}`;
    }
  };

  // Função para lidar com a formatação automática durante a digitação
  const handleDateInputChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatDateInput(rawValue);

    // Atualizar o valor exibido
    setEditedEvent({
      ...editedEvent,
      displayDate: formattedValue,
    });

    // Se temos uma data completa (dd/mm/yyyy), convertemos para formato API
    if (formattedValue.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const apiDate = formatDateForAPI(formattedValue);

      if (apiDate) {
        setEditedEvent((prev) => ({
          ...prev,
          displayDate: formattedValue,
          date: apiDate,
        }));
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificação de tipo de arquivo mais abrangente
      const acceptedImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/bmp',
      ];

      if (!acceptedImageTypes.includes(file.type)) {
        alert(
          'Por favor, selecione apenas arquivos de imagem (JPG, PNG, GIF).',
        );
        e.target.value = ''; // Limpar o input
        return;
      }

      // Verificar tamanho (limitar a 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert(
          'O arquivo é muito grande. Por favor, selecione uma imagem com menos de 5MB.',
        );
        e.target.value = ''; // Limpar o input
        return;
      }

      // Criar uma prévia da imagem
      const previewUrl = URL.createObjectURL(file);

      setEditedEvent({
        ...editedEvent,
        file,
        previewUrl,
      });

      // Verificar se o estado foi atualizado
    }
  };

  // Limpar a URL da prévia ao desmontar
  useEffect(() => {
    return () => {
      if (editedEvent.previewUrl) {
        URL.revokeObjectURL(editedEvent.previewUrl);
      }
    };
  }, []);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirmSave = () => {
    // Validação dos campos obrigatórios
    if (!editedEvent.title || !editedEvent.title.trim()) {
      alert('Por favor, preencha o título do evento.');
      const titleInput = document.getElementById('title');
      if (titleInput) titleInput.focus();
      return;
    }

    // Validar se a data está formatada corretamente
    if (
      !editedEvent.displayDate ||
      !editedEvent.displayDate.match(/^\d{2}\/\d{2}\/\d{4}$/)
    ) {
      alert('Por favor, preencha a data no formato DD/MM/AAAA.');
      const dateInput = document.getElementById('date');
      if (dateInput) dateInput.focus();
      return;
    }

    if (onSave) onSave();
  };

  // Garante que o modal seja focável
  useEffect(() => {
    if (isOpen) {
      // Focar no primeiro input quando o modal abrir
      setTimeout(() => {
        const firstInput = document.getElementById('title');
        if (firstInput) firstInput.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {selectedEvent ? 'Editar Evento' : 'Criar Novo Evento'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              value={editedEvent.title}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, title: e.target.value })
              }
              className="col-span-3 bg-neutral-800 border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="date" className="text-right">
              Data <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              value={editedEvent.displayDate}
              onChange={handleDateInputChange}
              placeholder="DD/MM/AAAA"
              className="col-span-3 bg-neutral-800 border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Descrição
            </label>
            <textarea
              id="description"
              value={editedEvent.description}
              onChange={(e) =>
                setEditedEvent({
                  ...editedEvent,
                  description: e.target.value,
                })
              }
              className="col-span-3 bg-neutral-800 border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="photo" className="text-right">
              Imagem
            </label>
            <div className="col-span-3">
              <div className="flex items-center gap-2 mb-2">
                <label
                  htmlFor="photo"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-2"
                >
                  <FileImage size={16} />
                  <span>Escolher Imagem</span>
                </label>
                <span className="text-sm text-neutral-400">
                  {editedEvent.file
                    ? editedEvent.file.name
                    : 'Nenhum arquivo selecionado'}
                </span>
              </div>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {(editedEvent.previewUrl || editedEvent.event_photo) && (
                <div className="mt-2">
                  <img
                    src={editedEvent.previewUrl || editedEvent.event_photo}
                    alt="Preview"
                    className="max-h-40 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div>
            {selectedEvent && (
              <Button
                variant="destructive"
                onClick={onDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Excluir
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="bg-neutral-700 hover:bg-neutral-600"
            >
              Cancelar
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleConfirmSave}
            >
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
