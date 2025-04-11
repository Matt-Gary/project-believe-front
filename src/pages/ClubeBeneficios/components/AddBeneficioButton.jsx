import { Plus } from 'lucide-react';

export default function AddBeneficioButton({ onClick }) {
  return (
    <div
      className="border-dashed border-2 border-neutral-600 w-[300px] h-[250px] rounded-md flex flex-col justify-center items-center cursor-pointer hover:bg-neutral-800 transition-colors"
      onClick={onClick}
    >
      <Plus size={64} className="text-neutral-400 mb-2" />
      <span className="text-neutral-400 font-medium">Adicionar Benefício</span>
    </div>
  );
}
