import { useState, useRef, useEffect } from 'react';
import { Trash, Save, Upload, X, Percent, Mail, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function BeneficioEditModal({
  isOpen,
  setIsOpen,
  selectedBeneficio,
  editedBeneficio,
  setEditedBeneficio,
  onSave,
  onDelete,
  onDeleteLogo,
}) {
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  // Constrói a URL completa do S3
  const getImageUrl = (path) => {
    if (!path) return null;
    return `https://believe-images.s3.us-east-1.amazonaws.com/${path}`;
  };

  useEffect(() => {
    if (selectedBeneficio?.companyLogo) {
      setImagePreview(getImageUrl(selectedBeneficio.companyLogo));
    } else {
      setImagePreview('');
    }
  }, [selectedBeneficio]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Atualizar estado do benefício com o arquivo
      setEditedBeneficio({
        ...editedBeneficio,
        file: file,
      });

      // Criar preview da imagem
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    if (selectedBeneficio && selectedBeneficio.companyLogo) {
      // Se temos um logo existente, chamar função para deletar do servidor
      if (onDeleteLogo) {
        onDeleteLogo();
      }
    }

    setEditedBeneficio({
      ...editedBeneficio,
      companyLogo: '',
      file: null,
    });
    setImagePreview('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedBeneficio ? 'Editar Benefício' : 'Criar Novo Benefício'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="companyName" className="text-right">
              Empresa
            </label>
            <input
              id="companyName"
              value={editedBeneficio.companyName || ''}
              onChange={(e) =>
                setEditedBeneficio({
                  ...editedBeneficio,
                  companyName: e.target.value,
                })
              }
              className="col-span-3 bg-neutral-800 border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="companyEmail" className="text-right">
              Email
            </label>
            <div className="col-span-3 relative">
              <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                id="companyEmail"
                type="email"
                value={editedBeneficio.companyEmail || ''}
                onChange={(e) =>
                  setEditedBeneficio({
                    ...editedBeneficio,
                    companyEmail: e.target.value,
                  })
                }
                className="w-full bg-neutral-800 border-neutral-700 rounded-md p-2 pl-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phoneNumber" className="text-right">
              Telefone
            </label>
            <div className="col-span-3 relative">
              <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                id="phoneNumber"
                type="tel"
                value={editedBeneficio.phoneNumber || ''}
                onChange={(e) =>
                  setEditedBeneficio({
                    ...editedBeneficio,
                    phoneNumber: e.target.value,
                  })
                }
                className="w-full bg-neutral-800 border-neutral-700 rounded-md p-2 pl-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ex: 5511999999999"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="discount" className="text-right">
              Desconto (%)
            </label>
            <div className="col-span-3 relative">
              <Percent className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={editedBeneficio.discount || ''}
                onChange={(e) =>
                  setEditedBeneficio({
                    ...editedBeneficio,
                    discount: e.target.value,
                  })
                }
                className="w-full bg-neutral-800 border-neutral-700 rounded-md p-2 pl-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Descrição
            </label>
            <textarea
              id="description"
              value={editedBeneficio.description || ''}
              onChange={(e) =>
                setEditedBeneficio({
                  ...editedBeneficio,
                  description: e.target.value,
                })
              }
              className="col-span-3 bg-neutral-800 border-neutral-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Logo</label>
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
                    {imagePreview ? 'Alterar logo' : 'Selecionar logo'}
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
            <div className="mt-1 flex justify-center">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Prévia do logo"
                  className="max-h-[150px] object-contain rounded-md border border-neutral-700"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[120px] border border-dashed border-neutral-700 rounded-md text-neutral-400 bg-neutral-800">
              Nenhum logo selecionado
            </div>
          )}
        </div>
        <DialogFooter>
          {selectedBeneficio && (
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
            onClick={onSave}
            disabled={!editedBeneficio.companyName || !editedBeneficio.discount}
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
