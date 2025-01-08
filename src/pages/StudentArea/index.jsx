import { Benefits } from '../Home/components/Benefits';
import { EventsCalendar } from './components/events-calendar';
import { LearnWithUs } from './components/learn-with-us';

export function StudentAreaPage() {
  return (
    <main>
      <EventsCalendar />
      <Benefits />
      <LearnWithUs />
    </main>
  );
}
