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
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'sonner';
import {
  Copy,
  CheckCircle,
  Percent,
  Info,
  MapPin,
  X,
  AlertCircle,
  Phone,
  QrCode,
} from 'lucide-react';
import api from '@/api';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '../confirmation-dialog';

export function ModalVoucher({
  children,
  valor,
  descricao,
  detalhes,
  comoUsar,
  benefitId,
  logoUrl,
}) {
  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [copied, setCopied] = useState(false);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { authenticated, userData } = useContext(AuthContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (authenticated && benefitId) {
      checkVoucherStatus();
    } else {
      setCheckingStatus(false);
    }
  }, [authenticated, benefitId]);

  const checkVoucherStatus = async () => {
    try {
      setCheckingStatus(true);

      const claimedVouchers = JSON.parse(
        localStorage.getItem('claimedVouchers') || '{}',
      );

      if (claimedVouchers[benefitId]) {
        setAlreadyClaimed(true);
        setVoucher(claimedVouchers[benefitId]);
      }
    } catch (error) {
      console.error('Erro ao verificar status do voucher:', error);
    } finally {
      setCheckingStatus(false);
    }
  };

  // Verifica se o usuário tem um número de telefone cadastrado
  const hasPhoneNumber = () => {
    return userData && userData.phoneNumber && userData.phoneNumber.length > 0;
  };

  const redeemVoucher = async () => {
    try {
      setIsSubmitting(true);
      await api.post(`/benefits/claim/${benefitId}`);
      toast.success('Voucher resgatado com sucesso!');
      setShowConfirmation(false);
    } catch (error) {
      console.error('Erro ao resgatar voucher:', error);
      if (error.response?.status === 404) {
        toast.error('Benefício não encontrado.');
      } else if (error.response?.status === 400) {
        toast.error('Dados incompletos. Verifique seu perfil.');
      } else {
        toast.error('Falha ao resgatar voucher. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleCopy() {
    if (voucher) {
      navigator.clipboard.writeText(voucher);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Código copiado para a área de transferência!');
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Detalhes do Benefício
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Veja informações completas sobre este benefício.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            <div className="flex flex-col items-center gap-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo do parceiro"
                  className="w-24 h-24 object-contain"
                />
              ) : (
                <div className="w-24 h-24 bg-zinc-800 rounded-md flex items-center justify-center">
                  <span className="text-lg font-bold text-center">
                    {detalhes ? detalhes.split('@')[0] : 'Parceiro'}
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-bold">
                  {detalhes ? detalhes.split('@')[0] : 'Parceiro Believe'}
                </h3>
                <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full mt-2 font-bold">
                  {valor}% de desconto
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-zinc-400">Descrição</h4>
                <p className="text-white">{descricao}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-zinc-400">
                  Como utilizar
                </h4>
                <p className="text-white">{comoUsar}</p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowConfirmation(true)}
              >
                <QrCode className="mr-2 h-4 w-4" /> Resgatar Voucher
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={redeemVoucher}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
