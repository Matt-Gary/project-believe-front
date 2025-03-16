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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePickerDemo } from './DatePickerDemo';

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
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      typeOfPlan,
      startDate: new Date(startDate), // Ajuste se desejar string ou Date
    },
  });

  const onSubmit = async (data) => {
    try {
      // Converta data conforme necessário
      await api.put('auth/userUpdateByMatricula', {
        matricula,
        typeOfPlan: data.typeOfPlan,
        startDate: data.startDate,
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
            <Select
              value={watch('typeOfPlan')}
              onValueChange={(val) => setValue('typeOfPlan', val)}
            >
              <SelectTrigger className="bg-zinc-700 text-zinc-200">
                <SelectValue placeholder="Plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>

            <label className="text-zinc-200 text-lg font-bold">
              Data de início
            </label>
            <DatePickerDemo
              value={watch('startDate')}
              onChange={(date) => setValue('startDate', date)}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}

            <Button
              type="submit"
              className="mt-2 self-end bg-green-600 hover:opacity-80"
            >
              Atualizar
            </Button>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
