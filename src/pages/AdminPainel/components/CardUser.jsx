import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Check, RefreshCcw, User, X } from 'lucide-react';
import { AlertDeletUser } from './AlertDeletUser';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { UpdateUser } from './UpdateUser';

export function CardUser({
  profilePhotoUrl,
  username,
  matricula,
  typeOfPlan,
  startDate,
  endDate,
  getUsers,
}) {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-[450px] self-start rounded-lg">
      <div className="bg-[#D9D9D9] w-full rounded-t-lg flex justify-center p-2">
        {(
          <User className="rounded-full size-28 text-zinc-700 border-2 border-zinc-500 p-2" />
        ) ?? (
          <img className="rounded-full size-28" src={profilePhotoUrl} alt="" />
        )}
      </div>
      <div className="bg-[#3C3C3C] w-full justify-center p-6 rounded-b-lg flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">{username}</h1>
        <h2>Matricula: {matricula}</h2>
        <div className="flex justify-center w-full gap-2 items-center p-2 rounded-lg bg-[#4A4A4A]">
          {new Date() > new Date(endDate) ? (
            <>
              <X className="bg-red-800 text-red-300 rounded-full" />
              <span>Não Pago</span>
            </>
          ) : (
            <>
              <Check className="bg-green-800 text-green-300 rounded-full" />
              <span>Pago</span>
            </>
          )}
        </div>
        <Dialog open={update} onOpenChange={setUpdate}>
          <div className="flex justify-center w-full gap-2 items-center p-2 rounded-lg bg-[#4A4A4A] cursor-pointer hover:opacity-80 duration-300">
            <RefreshCcw className="bg-green-800 rounded-full p-1" />
            <DialogTrigger>Atualizar usuário</DialogTrigger>
            <UpdateUser
              matricula={matricula}
              typeOfPlan={typeOfPlan}
              startDate={startDate}
              onClose={() => setUpdate(false)}
              getUsers={getUsers}
            />
          </div>
        </Dialog>
        <div className="flex justify-between w-full">
          <span>Tipo plano:</span>
          <span className="first-letter:uppercase font-bold">{typeOfPlan}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Iniciado:</span>
          <span>{formatDate(startDate)}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Finaliza:</span>
          <span>{formatDate(endDate)}</span>
        </div>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className="flex justify-center w-full gap-2 items-center p-2 rounded-lg bg-[#4A4A4A] cursor-pointer hover:opacity-80 duration-300">
            <X className="bg-red-800 rounded-full p-1" />
            <span>Apagar usuário</span>
          </AlertDialogTrigger>
          <AlertDeletUser
            matricula={matricula}
            getUsers={getUsers}
            onClose={() => setOpen(false)}
          />
        </AlertDialog>
      </div>
    </div>
  );
}
