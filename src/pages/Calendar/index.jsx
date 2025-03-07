import { Calendar } from 'lucide-react';

export function Calendarios() {
  return (
    <main className="wrapper">
      <div className="py-16">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=innovateignite.official%40gmail.com&ctz=America%2FFortaleza"
          style={{ border: 0 }}
          width="800"
          height="500"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </main>
  );
}
