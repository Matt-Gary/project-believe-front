import { Link } from 'react-router-dom';
import { CardEvents } from '../ui/CardEvents';
import { CardEventsMain } from '../ui/CardEventsMain';

export function EventsCalendar() {
  return (
    <section className="py-16  wrapper mx-auto flex flex-col justify-center">
      <h1 className="font-bold text-center  lg:text-start  text-2xl md:text-5xl uppercase">
        Calendário de eventos
      </h1>
      <div className="flex gap-4 justify-center lg:flex-row flex-col items-center lg:items-stretch">
        <CardEventsMain />
        <div className="grid md:grid-cols-[250px_250px]  gap-4 grid-cols-1">
          <CardEvents />
          <CardEvents />
          <CardEvents />
          <CardEvents />
        </div>
      </div>

      <Link to="calendar" className="button py-3 self-center mt-3">
        Procure mais
      </Link>
    </section>
  );
}
