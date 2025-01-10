import { Link } from 'react-router-dom';
import { CardBenefits } from '../components/ui/CardBenefit';
import { dataBenefits } from '../utils/data-benefits';
export function Benefits() {
  return (
    <section className="wrapper">
      <h2 className="mb-16 text-center text-3xl uppercase md:text-start md:text-5xl font-bold">
        Believe Club de Benefícios
      </h2>

      <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {dataBenefits.map((benefit) => (
          <CardBenefits
            key={benefit.id}
            logo={benefit.logo}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>

      <div className="flex justify-center sm:justify-start">
        <Link to="/clube-beneficios" className="button">
          Ver Todos
        </Link>
      </div>
    </section>
  );
}
