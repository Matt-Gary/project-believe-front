import { Link } from 'react-router-dom';
import { CardWeGallery } from '../ui/CardWeGallery';

export function WeGallery() {
  return (
    <div className="wrapper mx-auto pt-16 flex flex-col">
      <h1 className="font-bold text-center lg:text-start text-2xl md:text-5xl uppercase">
        Nossa Galeria de imagens
      </h1>
      <CardWeGallery />
      <Link to="/galeria" className="button self-center ">
        Ver galeria completa
      </Link>
    </div>
  );
}
