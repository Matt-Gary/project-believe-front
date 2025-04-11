import { Link } from 'react-router-dom';
import { CardEvents } from '../ui/CardEvents';
import { CardEventsMain } from '../ui/CardEventsMain';
import { useState, useEffect } from 'react';
import api from '@/api';

export function EventsCalendar() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para formatar a data ISO para dd/mm/yyyy
  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return '';
    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return '';
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      return '';
    }
  };

  async function getCalendar() {
    try {
      setLoading(true);
      const response = await api.get('/calendar');

      if (response.data && Array.isArray(response.data)) {
        // Formatar os dados antes de atualizar o estado
        const eventosFormatados = response.data.map((evento) => ({
          ...evento,
          formattedDate: formatDateForDisplay(evento.date),
        }));
        setEventos(eventosFormatados);
      } else {
        setEventos([]);
      }
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      setEventos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCalendar();
  }, []);

  // Filtra o evento principal (primeiro evento ou o mais próximo)
  const eventoPrincipal = eventos && eventos.length > 0 ? eventos[0] : null;
  // Resto dos eventos para os cards menores
  const eventosSecundarios =
    eventos && eventos.length > 1 ? eventos.slice(1, 5) : [];

  return (
    <section className="py-16 wrapper mx-auto flex flex-col justify-center">
      <h1 className="font-bold text-center lg:text-start text-2xl md:text-5xl uppercase">
        Calendário de eventos
      </h1>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex gap-4 justify-center lg:flex-row flex-col items-center lg:items-stretch">
            {eventos.length > 0 ? (
              <>
                {/* Evento principal (o mais recente) */}
                <CardEventsMain
                  id={eventoPrincipal.id}
                  title={eventoPrincipal.event_name}
                  description={eventoPrincipal.description}
                  date={eventoPrincipal.formattedDate}
                  imageUrl={eventoPrincipal.event_photo}
                />

                {/* Grid com outros eventos */}
                <div className="grid md:grid-cols-[250px_250px] gap-4 grid-cols-1">
                  {eventosSecundarios.map((evento) => (
                    <CardEvents
                      key={evento.id}
                      id={evento.id}
                      title={evento.event_name}
                      description={evento.description}
                      date={evento.formattedDate}
                      imageUrl={evento.event_photo}
                    />
                  ))}

                  {/* Preencher com cards vazios se necessário */}
                  {Array.from({
                    length: Math.max(0, 4 - eventosSecundarios.length),
                  }).map((_, index) => (
                    <CardEvents key={`empty-${index}`} />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-10 text-center text-neutral-400">
                Nenhum evento encontrado no calendário.
              </div>
            )}
          </div>

          <Link to="/calendarios" className="button py-3 self-center mt-3">
            Procure mais
          </Link>
        </>
      )}
    </section>
  );
}
