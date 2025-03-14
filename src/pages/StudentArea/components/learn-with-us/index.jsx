import { Link } from 'react-router-dom';
import { CardLearnWithUs } from '../ui/CardLearnWithUs';

export function LearnWithUs() {
  return (
    <div className="wrapper mx-auto pt-16 flex flex-col">
      <h1 className="font-bold text-center lg:text-start text-2xl md:text-5xl uppercase">
        Aprenda conosco - Tutoriais
      </h1>
      <CardLearnWithUs />
      <Link to="/tutoriais" className="button self-center ">
        Procure mais
      </Link>
    </div>
  );
}
