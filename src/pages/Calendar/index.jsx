import { Calendar } from 'lucide-react';
import { CardCalendar } from './components/CardCalendar';
import { CardCalendarPrincipal } from './components/CardCalendarPrincipal';

import { useEffect, useState, useContext } from 'react';
import api from '@/api';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
export function Calendarios() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(AuthContext);

  async function getCalendar() {
    try {
      setLoading(true);
      const response = await api.get('/calendar');
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
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
    eventos && eventos.length > 1 ? eventos.slice(1) : [];

  return (
    <main className="wrapper min-h-screen py-8 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 mb-8">
            <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start text-white">
              Calendário
            </h1>
            <Calendar className="w-10 h-10 text-white" />
          </div>
          {userData?.role === 'ADMIN' && (
            <Button className="bg-zinc-800 text-white">
              <Link to="/editar-calendario">Editar Conteúdo</Link>
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center text-white py-12">
            Carregando eventos...
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Coluna do card principal */}
            <div className="col-span-12 lg:col-span-4">
              {eventoPrincipal && (
                <CardCalendarPrincipal
                  imagemEvento={eventoPrincipal.event_photo}
                  data={eventoPrincipal.date}
                  titulo={eventoPrincipal.title}
                  descricao={eventoPrincipal.description}
                />
              )}
            </div>

            {/* Coluna dos cards menores */}
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {eventosSecundarios.map((evento) => (
                  <CardCalendar
                    key={evento.id}
                    imagemEvento={evento.event_photo}
                    data={evento.date}
                    titulo={evento.title}
                    descricao={evento.description}
                    horario={evento.time}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
