import React from 'react';

export default function EventsGrid({ eventos, loading, onEventClick }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-800/50 rounded-lg h-48 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!eventos.length) {
    return (
      <div className="text-center p-8 bg-zinc-800/50 rounded-lg flex-1">
        <p>Nenhum evento encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
      {eventos.map((evento) => (
        <div
          key={evento.id}
          className="bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:bg-zinc-700 transition-colors duration-300 group"
          onClick={() => onEventClick(evento)}
        >
          <div className="relative h-36">
            {evento.event_photo ? (
              <img
                src={evento.event_photo}
                alt={evento.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                <span className="text-zinc-400">Sem imagem</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-zinc-900/80 text-white text-xs px-2 py-1 rounded">
              {evento.displayDate}
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-bold text-white text-lg truncate">
              {evento.title}
            </h3>
            <p className="text-zinc-400 text-sm line-clamp-2 mt-1">
              {evento.description || 'Sem descrição'}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-zinc-500">
                {evento.photos?.length || 0} foto(s)
              </span>
              <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Editar evento
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
