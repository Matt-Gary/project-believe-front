import { Benefits } from '../Home/components/Benefits';
import { EventsCalendar } from './components/events-calendar';

export function StudentAreaPage() {
  return (
    <main>
      <EventsCalendar />
      <Benefits />
    </main>
  );
}
