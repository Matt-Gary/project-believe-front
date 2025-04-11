import { Search } from 'lucide-react';

export default function EventFilter({ filter, setFilter }) {
  return (
    <div className="w-full max-w-md mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="w-4 h-4 text-neutral-400" />
        </div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 placeholder:text-neutral-400"
          placeholder="Filtrar por título, data ou descrição..."
        />
        {filter && (
          <button
            onClick={() => setFilter('')}
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <span className="text-neutral-400 hover:text-white text-sm font-medium">
              Limpar
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
