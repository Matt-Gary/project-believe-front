import { AlertTriangle, Check, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

export function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting,
}) {
  const { authenticated, userData } = useContext(AuthContext);

  // Verifica se o usuário tem um número de telefone cadastrado
  const hasPhoneNumber = () => {
    return userData && userData.phoneNumber && userData.phoneNumber.length > 0;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-500">
            <Check className="h-5 w-5" />
            Confirmar Resgate
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-neutral-300">
            Tem certeza que deseja resgatar este voucher?
          </p>
          <p className="mt-2 text-neutral-400 text-sm">
            Você receberá um código de verificação por WhatsApp.
          </p>

          {authenticated && !hasPhoneNumber() && (
            <div className="mt-4 p-3 bg-amber-900/30 border border-amber-500/30 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-300">
                  É necessário cadastrar seu telefone no perfil para receber o
                  código de voucher via WhatsApp.
                </p>
              </div>
            </div>
          )}

          {!authenticated && (
            <div className="mt-4 p-3 bg-amber-900/30 border border-amber-500/30 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-300">
                  Você precisa estar logado para resgatar este voucher.
                </p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-zinc-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting || !authenticated || !hasPhoneNumber()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Confirmar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
