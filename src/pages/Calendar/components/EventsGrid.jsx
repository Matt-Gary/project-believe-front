import { Loader2, Edit, Calendar } from 'lucide-react';

export default function EventsGrid({ eventos, loading, onEventClick }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[250px] w-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div className="flex justify-center items-center h-[250px] text-neutral-400">
        Nenhum evento encontrado
      </div>
    );
  }

  return (
    <>
      {eventos.map((evento) => (
        <div
          key={evento.id}
          className="w-[300px] h-[250px] rounded-md shadow-md relative cursor-pointer group"
          onClick={() => onEventClick(evento)}
        >
          <img
            src={evento.event_photo}
            alt={evento.title}
            className="w-full h-[250px] object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
            <Edit className="text-white h-6 w-6 mb-2" />
            <span className="text-white font-medium">Editar</span>
            <div className="mt-2 flex items-center">
              <Calendar className="text-white h-4 w-4 mr-1" />
              <span className="text-white text-sm">{evento.displayDate}</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 truncate">
            <h3 className="text-white font-medium truncate">{evento.title}</h3>
          </div>
        </div>
      ))}
    </>
  );
}
