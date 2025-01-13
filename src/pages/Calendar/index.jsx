import { Calendar } from 'lucide-react';
import calendario from '../../assets/calendario.png';

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
        <img className="object-cover" src={calendario} alt="" />
      </div>
    </main>
  );
}
