import React from 'react';
import { Plus } from 'lucide-react';

export default function AddEventButton({ onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div
      className="bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:bg-zinc-700 transition-colors duration-300 flex flex-col items-center justify-center"
      onClick={handleClick}
      style={{ height: '100%', minHeight: '216px' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
    >
      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-2">
        <Plus size={24} color="white" />
      </div>
      <p className="text-white font-medium">Adicionar Evento</p>
    </div>
  );
}
