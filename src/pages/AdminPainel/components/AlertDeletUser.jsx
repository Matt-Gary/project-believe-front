import { toast } from 'sonner';
import api from '../../../api';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function AlertDeletUser({ matricula, getUsers, onClose }) {
  async function deleteUser() {
    try {
      await api.delete(`auth/userByMatricula`, {
        data: { matricula },
      });
      toast.success('Usuário deletado com sucesso!');
      getUsers();
      onClose();
    } catch (error) {
      toast.error('Erro ao deletar usuário');
    }
  }

  return (
    <AlertDialogContent className="bg-zinc-800 border-zinc-700">
      <AlertDialogHeader>
        <AlertDialogTitle>
          Você quer realmente{' '}
          <span className="font-bold uppercase">apagar</span> o aluno (
          {matricula})?
        </AlertDialogTitle>
        <span className="font-bold uppercase">
          Essa ação não pode ser desfeita.
        </span>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={onClose}
          className="bg-green-600 hover:opacity-80 duration-300 hover:bg-green-600 hover:duration-300 text-zinc-200 hover:text-zinc-200"
        >
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction
          className="bg-red-800 hover:opacity-80 duration-300 hover:bg-red-800 hover:duration-300"
          onClick={deleteUser}
        >
          Apagar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
