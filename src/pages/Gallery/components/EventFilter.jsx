import React from 'react';
import { Search } from 'lucide-react';

export default function EventFilter({ filter, setFilter }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-zinc-400" />
      </div>
      <input
        type="text"
        placeholder="Buscar eventos..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="pl-10 py-2 pr-4 block w-full rounded-md bg-zinc-800 border-zinc-700 focus:border-blue-500 focus:ring-blue-500 text-white"
      />
    </div>
  );
}
