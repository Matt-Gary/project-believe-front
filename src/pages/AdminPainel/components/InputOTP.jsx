import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import api from '../../../api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function InputOtpAdmin() {
  const [code, setCode] = useState('');
  const [newCode, setNewCode] = useState(Array(6).fill(''));

  async function getCode() {
    const response = await api.get('auth/get-code');
    setCode(response.data.code);
  }

  async function updateCode(e) {
    e.preventDefault();
    const formattedCode = newCode.join('');

    if (formattedCode.length !== 6) {
      toast.error('O código deve ter 6 dígitos!');
      return;
    }

    try {
      await api.post('auth/set-code', { code: formattedCode });
      toast.success('Código atualizado com sucesso!');
      getCode();
    } catch (error) {
      console.error('Erro ao atualizar o código:', error);
      toast.error('Erro ao atualizar o código');
    }
  }

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className="flex gap-16">
      {/* Código Atual */}
      <div className="flex items-center justify-center self-start gap-4">
        <h2 className="font-bold text-xl">Código Atual:</h2>
        <div className="flex items-center">
          {code.split('').map((digit, index) => (
            <div
              key={index}
              className="relative flex h-9 w-9 items-center justify-center border border-neutral-200 text-sm shadow-sm dark:border-neutral-800 last:rounded-r-md first:rounded-l-md"
            >
              <span>{digit}</span>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={updateCode}
        className="flex items-center justify-center self-start gap-4"
      >
        <h2 className="font-bold text-xl">Código Novo</h2>
        <InputOTP
          maxLength={6}
          onChange={(value) => setNewCode(value.split(''))}
        >
          <InputOTPGroup>
            {Array.from({ length: 3 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {Array.from({ length: 3 }).map((_, i) => (
              <InputOTPSlot key={i + 3} index={i + 3} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <Button type="submit" variant="secondary">
          Alterar
        </Button>
      </form>
    </div>
  );
}
