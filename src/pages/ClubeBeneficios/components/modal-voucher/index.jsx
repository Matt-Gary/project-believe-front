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
} from 'lucide-react';
import api from '@/api';

export function ModalVoucher({
  children,
  valor,
  detalhes,
  descricao,
  comoUsar,
  benefitId,
}) {
  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [copied, setCopied] = useState(false);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { authenticated, userData } = useContext(AuthContext);

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

  async function handleClaim() {
    if (!authenticated) {
      toast.error('Você precisa estar logado para resgatar este voucher');
      return;
    }

    if (alreadyClaimed) {
      toast.error('Você já resgatou este voucher anteriormente');
      return;
    }

    // Verificar se usuário tem telefone cadastrado
    if (!hasPhoneNumber()) {
      setErrorMessage(
        'Você precisa ter um número de telefone cadastrado para receber o voucher por WhatsApp',
      );
      toast.error('Sem número de telefone cadastrado');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // Fazer requisição com detalhes de debug
      console.log(`Enviando requisição para /benefits/claim/${benefitId}`);
      console.log('Dados do usuário:', userData);

      try {
        const response = await api.post(`/benefits/claim/${benefitId}`);

        console.log('Resposta da API:', response.data);
        toast.success('Código de verificação enviado para seu WhatsApp!');

        // Simulação do código (na implementação real, viria do backend)
        const code =
          response.data.verificationCode ||
          Math.random().toString(36).substring(2, 10).toUpperCase();
        setVoucher(code);

        // Armazenar localmente para futura referência
        const claimedVouchers = JSON.parse(
          localStorage.getItem('claimedVouchers') || '{}',
        );
        claimedVouchers[benefitId] = code;
        localStorage.setItem(
          'claimedVouchers',
          JSON.stringify(claimedVouchers),
        );

        setAlreadyClaimed(true);
      } catch (apiError) {
        console.error('Erro detalhado na API:', apiError);
        console.error('Status:', apiError.response?.status);
        console.error('Dados do erro:', apiError.response?.data);

        // Mensagem de erro mais informativa
        let errorMsg = 'Erro ao resgatar voucher';

        if (apiError.response?.status === 400) {
          if (
            apiError.response?.data?.message ===
            'Company phone number is missing'
          ) {
            errorMsg =
              'O estabelecimento não tem telefone cadastrado para receber a notificação';
          } else {
            errorMsg =
              apiError.response?.data?.message ||
              'Dados inválidos para resgate';
          }
        } else if (apiError.response?.status === 401) {
          errorMsg = 'Sessão expirada. Faça login novamente';
        } else if (apiError.response?.status === 404) {
          if (apiError.response?.data?.message === 'User not found') {
            errorMsg = 'Usuário não encontrado';
          } else if (apiError.response?.data?.message === 'Benefit not found') {
            errorMsg = 'Benefício não encontrado';
          } else {
            errorMsg = 'Recurso não encontrado';
          }
        }

        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Erro geral ao resgatar voucher:', error);
      setErrorMessage('Erro de comunicação com o servidor');
      toast.error('Erro ao resgatar voucher. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (voucher) {
      navigator.clipboard.writeText(voucher);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Código copiado para a área de transferência!');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-w-md">
        <div className="absolute top-4 right-4">
          <button className="text-neutral-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 -mx-6 -mt-6 p-6 mb-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Desconto de {valor}%
            </h2>
            <div className="bg-white/20 rounded-full p-2">
              <Percent className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-white/80 mt-2">{detalhes}</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-lg">Descrição</h3>
            </div>
            <p className="text-neutral-300 pl-7">{descricao}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-lg">Como Usar</h3>
            </div>
            <p className="text-neutral-300 pl-7">{comoUsar}</p>
          </div>

          {checkingStatus ? (
            <div className="mt-6 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <span className="ml-3 text-blue-300">Verificando status...</span>
            </div>
          ) : voucher || alreadyClaimed ? (
            <div className="mt-6 bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="text-center text-sm text-green-300">
                  Voucher resgatado com sucesso!
                </p>
              </div>
              <p className="text-center text-sm text-blue-300 mb-2">
                Seu código de verificação:
              </p>
              <div className="flex items-center justify-between bg-blue-950 p-3 rounded border border-blue-600">
                <span className="font-mono font-semibold text-xl tracking-wider text-white">
                  {voucher}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-blue-400 hover:text-blue-200 transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-center text-xs text-blue-300 mt-4">
                Para usar o desconto, mostre este código ou o código recebido no
                seu WhatsApp para o estabelecimento.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              {authenticated && !hasPhoneNumber() && (
                <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-500/30 mb-4">
                  <div className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-300">
                      É necessário cadastrar seu telefone no perfil para receber
                      o código de voucher via WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-900/30 p-3 rounded-lg border border-red-500/30 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-300">{errorMessage}</p>
                  </div>
                </div>
              )}

              <button
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 px-4 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={
                  !authenticated ||
                  loading ||
                  (!hasPhoneNumber() && authenticated)
                }
                onClick={handleClaim}
              >
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                ) : (
                  <CheckCircle className="mr-2 h-5 w-5" />
                )}
                {loading ? 'Processando...' : 'Resgatar Voucher'}
              </button>

              {!authenticated && (
                <div className="flex items-center justify-center gap-2 text-amber-500 text-sm mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <p>Você precisa estar logado para resgatar este voucher</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
