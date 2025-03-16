import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import api from '../../../api';

export function UpdateUser({
  matricula,
  typeOfPlan,
  startDate,
  onClose,
  getUsers,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      typeOfPlan,
      startDate: new Date(startDate).toLocaleDateString('pt-BR'),
    },
  });

  const onSubmit = async (data) => {
    try {
      const [day, month, year] = data.startDate.split('/');

      const formattedStartDate = `${month}/${day}/${year}`;

      await api.put('auth/userUpdateByMatricula', {
        matricula,
        typeOfPlan: data.typeOfPlan,
        startDate: formattedStartDate,
      });
      onClose?.();
      toast.success('Usuário atualizado com sucesso');
      getUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Erro ao atualizar usuário');
    }
  };

  return (
    <DialogContent className="bg-zinc-800 border-zinc-700">
      <DialogHeader>
        <DialogTitle>Atualizar usuário ({matricula})</DialogTitle>
        <DialogDescription className="flex flex-col gap-2 py-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label className="text-zinc-200 text-lg font-bold">
              Tipo de plano
            </label>
            <Input
              {...register('typeOfPlan', {
                required: 'Este campo é obrigatório',
              })}
              className="text-zinc-200"
            />
            {errors.typeOfPlan && (
              <p className="text-red-500 text-sm">
                {errors.typeOfPlan.message}
              </p>
            )}

            <label className="text-zinc-200 text-lg font-bold">
              Data de início
            </label>
            <Input
              {...register('startDate', {
                required: 'Este campo é obrigatório',
              })}
              className="text-zinc-200"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}

            <Button
              type="submit"
              className="mt-2 self-end bg-green-600 hover:opacity-80 duration-300 hover:bg-green-600 hover:duration-300 text-zinc-200 hover:text-zinc-200"
            >
              Atualizar
            </Button>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
