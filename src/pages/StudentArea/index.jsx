import { Benefits } from '../Home/components/Benefits';

import { EventsCalendar } from './components/events-calendar';
import { LearnWithUs } from './components/learn-with-us';
import { WeGallery } from './components/we-gallery';

export function StudentAreaPage() {
  return (
    <main className="mb-8">
      <EventsCalendar />
      <Benefits />
      <LearnWithUs />
      <WeGallery />
    </main>
  );
}
