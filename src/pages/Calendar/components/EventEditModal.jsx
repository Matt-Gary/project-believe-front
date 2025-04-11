import { useState, useRef, useEffect } from 'react';
import { Trash, Save, Upload, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Função para converter dd/mm/yyyy para YYYY-MM-DD
const formatDateForAPI = (displayDate) => {
  if (!displayDate || !displayDate.includes('/')) return '';

  const parts = displayDate.split('/');
  if (parts.length !== 3) return '';

  const day = parts[0].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  const year = parts[2];

  return `${year}-${month}-${day}`;
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
  const [imagePreview, setImagePreview] = useState(
    editedEvent.event_photo || '',
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImagePreview(editedEvent.event_photo || '');
  }, [editedEvent.event_photo, selectedEvent]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Atualizar estado do evento com o arquivo
      setEditedEvent({
        ...editedEvent,
        file: file,
      });

      // Criar preview da imagem
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setEditedEvent({
      ...editedEvent,
      event_photo: '',
      file: null,
    });
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Função para formatar input enquanto o usuário digita
  const formatDateInput = (value) => {
    // Remove caracteres não numéricos
    const numbersOnly = value.replace(/\D/g, '');

    // Aplica a formatação dd/mm/yyyy
    if (numbersOnly.length <= 2) {
      return numbersOnly;
    } else if (numbersOnly.length <= 4) {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
    } else {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2, 4)}/${numbersOnly.slice(4, 8)}`;
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
        console.log('Data convertida para API:', apiDate);
        setEditedEvent((prev) => ({
          ...prev,
          displayDate: formattedValue,
          date: apiDate,
        }));
      }
    }
  };

  // Função para lidar com o salvamento e garantir data no formato correto
  const handleSave = () => {
    // Garantir que temos uma data no formato YYYY-MM-DD antes de enviar
    const apiDate = formatDateForAPI(editedEvent.displayDate);

    if (!apiDate) {
      alert('Por favor, insira uma data válida no formato DD/MM/AAAA');
      return;
    }

    // Atualizar a data no formato correto antes de salvar
    setEditedEvent((prev) => ({
      ...prev,
      date: apiDate,
    }));

    // Chamar o callback de salvamento com pequeno delay para garantir que o state foi atualizado
    setTimeout(() => {
      onSave();
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {selectedEvent ? 'Editar Evento' : 'Criar Novo Evento'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Título
            </label>
            <input
              id="title"
              value={editedEvent.title}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, title: e.target.value })
              }
              className="col-span-3 bg-neutral-800 border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                setEditedEvent({ ...editedEvent, description: e.target.value })
              }
              className="col-span-3 bg-neutral-800 border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="date" className="text-right">
              Data
            </label>
            <input
              id="date"
              type="text"
              placeholder="dd/mm/aaaa"
              value={editedEvent.displayDate}
              onChange={handleDateInputChange}
              maxLength={10}
              className="col-span-3 bg-neutral-800 border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Imagem</label>
            <div className="col-span-3">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current.click()}
                    type="button"
                    className="bg-zinc-800"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {imagePreview ? 'Alterar imagem' : 'Selecionar imagem'}
                  </Button>

                  {imagePreview && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveImage}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {imagePreview ? (
            <div className="mt-2 flex justify-center">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Prévia da imagem"
                  className="max-h-[200px] object-contain rounded-md border border-neutral-700"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px] border border-dashed border-neutral-700 rounded-md text-neutral-400 bg-neutral-800">
              Nenhuma imagem selecionada
            </div>
          )}
        </div>
        <DialogFooter>
          {selectedEvent && (
            <Button
              variant="destructive"
              onClick={onDelete}
              className="mr-auto"
            >
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="bg-zinc-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!editedEvent.title || !editedEvent.displayDate}
            className="bg-green-600 hover:bg-green-600/80"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
