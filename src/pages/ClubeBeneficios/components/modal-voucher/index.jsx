import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { AuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import { toast } from 'sonner';
export function ModalVoucher({
  children,
  valor,
  detalhes,
  descricao,
  comoUsar,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { authenticated } = useContext(AuthContext);
  function handleClaim() {
    toast.success('Voucher claimed!');
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#00b4d8] border-transparent">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Detalhes</DialogTitle>
          <Separator />
          <DialogDescription>
            <div>
              <span className="text-white font-bold text-xl">R$ {valor}</span>
              <p className="text-white">{detalhes}</p>
            </div>
            <Separator className="!my-2" />
            <DialogTitle className="font-bold text-xl text-white">
              Descrição
            </DialogTitle>
            <Separator className="my-2" />
            <div>
              <p className="text-white">{descricao}</p>
            </div>
            <Separator className="!my-2" />
            <DialogTitle className="font-bold text-xl text-white">
              Como usar
            </DialogTitle>
            <Separator className="my-2" />
            <div className="flex flex-col gap-2">
              <p className="text-white">{comoUsar}</p>
              <button
                className="bg-white text-black px-3 py-1 hover:opacity-60 duration-300 rounded-full self-center disabled:cursor-not-allowed disabled:hover:opacity-70 disabled:opacity-70"
                disabled={!authenticated}
                onClick={handleClaim}
              >
                Claim
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
