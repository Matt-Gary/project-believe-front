import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

export default function DeleteConfirmationModal({
  isOpen,
  setIsOpen,
  onConfirm,
  eventTitle,
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="border-red-900/50 bg-zinc-900">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <Trash2 className="h-5 w-5" />
            <AlertDialogTitle className="text-red-500">
              Confirmar exclusão
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-zinc-300">
            Tem certeza que deseja excluir o evento{' '}
            <span className="font-medium text-white">"{eventTitle}"</span>?
            <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50 rounded-md text-white">
              <span className="font-bold text-red-400 block mb-2">
                Atenção:
              </span>
              Esta ação não pode ser desfeita e todas as fotos relacionadas
              serão excluídas permanentemente.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 border-t border-zinc-800 pt-4">
          <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir evento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
