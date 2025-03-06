import { Calendar } from 'lucide-react';

export function Calendarios() {
  return (
    <main className="wrapper">
      <div className="py-16">
        <div className="flex items-center gap-3 pb-8">
          <Calendar />
          <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start">
            January 2025
          </h1>
        </div>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=innovateignite.official%40gmail.com&ctz=America%2FFortaleza"
          style={{ border: 0 }}
          width="800"
          height="600"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </main>
  );
}
