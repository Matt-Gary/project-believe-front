import { Edit, Percent } from 'lucide-react';

export default function BeneficioCard({ beneficio, onClick }) {
  // Constrói a URL completa do S3
  const getImageUrl = (path) => {
    if (!path) return null;
    return `https://believe-images.s3.us-east-1.amazonaws.com/${path}`;
  };

  return (
    <div
      className="w-[300px] h-[250px] rounded-md shadow-md relative cursor-pointer group"
      onClick={() => onClick(beneficio)}
    >
      {beneficio.companyLogo ? (
        <img
          src={getImageUrl(beneficio.companyLogo)}
          alt={beneficio.companyName}
          className="w-full h-[250px] object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-[250px] bg-neutral-800 rounded-md flex flex-col items-center justify-center p-4">
          <span className="text-2xl font-bold text-center text-white">
            {beneficio.companyName}
          </span>
          <div className="flex items-center mt-2">
            <Percent className="text-green-500 mr-2" />
            <span className="text-green-500 font-bold">
              {beneficio.discount}% de desconto
            </span>
          </div>
        </div>
      )}

      {/* Overlay ao passar o mouse */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
        <Edit className="text-white h-6 w-6 mb-2" />
        <span className="text-white font-medium">Editar</span>
      </div>

      {/* Nome da empresa e desconto na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
        <h3 className="text-white font-medium truncate">
          {beneficio.companyName}
        </h3>
        <p className="text-green-400 text-sm">
          {beneficio.discount}% de desconto
        </p>
      </div>
    </div>
  );
}
