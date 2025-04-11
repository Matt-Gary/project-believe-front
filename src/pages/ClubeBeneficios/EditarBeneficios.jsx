import { AuthContext } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import AddBeneficioButton from './components/AddBeneficioButton';
import BeneficioCard from './components/BeneficioCard';
import BeneficioFilter from './components/BeneficioFilter';
import BeneficioEditModal from './components/BeneficioEditModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { beneficiosService } from './services/beneficiosService';

export function EditarBeneficios() {
  const { userData } = useContext(AuthContext);
  const [beneficios, setBeneficios] = useState([]);
  const [filteredBeneficios, setFilteredBeneficios] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal de edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBeneficio, setSelectedBeneficio] = useState(null);
  const [editedBeneficio, setEditedBeneficio] = useState({});

  // Modal de confirmação de exclusão
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Função para construir a URL completa da imagem no S3
  const getImageUrl = (path) => {
    if (!path) return null;
    // Verificar se já é uma URL completa
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Construir URL do S3
    return `https://believe-images.s3.us-east-1.amazonaws.com/${path}`;
  };

  useEffect(() => {
    fetchBeneficios();
  }, []);

  useEffect(() => {
    if (filter) {
      const lowercaseFilter = filter.toLowerCase();
      const filtered = beneficios.filter(
        (beneficio) =>
          beneficio.companyName.toLowerCase().includes(lowercaseFilter) ||
          beneficio.description.toLowerCase().includes(lowercaseFilter) ||
          String(beneficio.discount).includes(lowercaseFilter),
      );
      setFilteredBeneficios(filtered);
    } else {
      setFilteredBeneficios(beneficios);
    }
  }, [beneficios, filter]);

  // Buscar benefícios da API
  const fetchBeneficios = async () => {
    try {
      setIsLoading(true);
      const data = await beneficiosService.getBeneficios();

      // Adicionar URLs de imagem completas
      const beneficiosWithFullImageUrls = data.map((beneficio) => ({
        ...beneficio,
        fullImageUrl: beneficio.companyLogo
          ? getImageUrl(beneficio.companyLogo)
          : null,
      }));

      setBeneficios(beneficiosWithFullImageUrls);
    } catch (error) {
      console.error('Erro ao buscar benefícios:', error);
      toast.error('Não foi possível carregar os benefícios.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedBeneficio(null);
    setEditedBeneficio({});
    setIsEditModalOpen(true);
  };

  const handleEditClick = (beneficio) => {
    setSelectedBeneficio(beneficio);
    setEditedBeneficio({
      companyName: beneficio.companyName,
      companyEmail: beneficio.companyEmail,
      phoneNumber: beneficio.phoneNumber,
      discount: beneficio.discount,
      description: beneficio.description,
      companyLogo: beneficio.companyLogo,
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (selectedBeneficio) {
        // Atualização
        await beneficiosService.updateBeneficio(
          selectedBeneficio.id,
          editedBeneficio,
        );
        toast.success('Benefício atualizado com sucesso!');
      } else {
        // Criação
        await beneficiosService.createBeneficio(editedBeneficio);
        toast.success('Benefício criado com sucesso!');
      }

      setIsEditModalOpen(false);
      fetchBeneficios();
    } catch (error) {
      toast.error(
        selectedBeneficio
          ? 'Erro ao atualizar benefício'
          : 'Erro ao criar benefício',
      );
      console.error(error);
    }
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await beneficiosService.deleteBeneficio(selectedBeneficio.id);
      setIsDeleteModalOpen(false);
      setIsEditModalOpen(false);
      toast.success('Benefício excluído com sucesso!');
      fetchBeneficios();
    } catch (error) {
      toast.error('Erro ao excluir benefício');
      console.error(error);
    }
  };

  const handleDeleteLogo = async () => {
    try {
      if (selectedBeneficio?.id) {
        await beneficiosService.deleteLogo(selectedBeneficio.id);
        toast.success('Logo removido com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao remover logo');
      console.error(error);
    }
  };

  return (
    <main className="wrapper py-6 space-y-6 pb-16">
      <Link to={'/clube-beneficios'}>
        <ArrowLeft className="bg-zinc-700 hover:bg-zinc-600 duration-300 rounded-full p-1" />
      </Link>

      <h1 className="text-4xl font-bold">Editar Benefícios</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <BeneficioFilter filter={filter} setFilter={setFilter} />
        <div className="text-neutral-400 text-sm">
          {filteredBeneficios.length}{' '}
          {filteredBeneficios.length === 1
            ? 'benefício encontrado'
            : 'benefícios encontrados'}
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <AddBeneficioButton onClick={handleAddClick} />

        {isLoading ? (
          <div className="w-[300px] h-[250px] flex justify-center items-center bg-neutral-800 rounded-md">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBeneficios.length === 0 && filter ? (
          <div className="w-[300px] h-[250px] flex flex-col justify-center items-center bg-neutral-800 rounded-md p-4">
            <span className="text-neutral-400 text-center">
              Nenhum benefício encontrado com o termo "{filter}"
            </span>
          </div>
        ) : (
          filteredBeneficios.map((beneficio) => (
            <BeneficioCard
              key={beneficio.id}
              beneficio={beneficio}
              onClick={handleEditClick}
            />
          ))
        )}
      </div>

      <BeneficioEditModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        selectedBeneficio={selectedBeneficio}
        editedBeneficio={editedBeneficio}
        setEditedBeneficio={setEditedBeneficio}
        onSave={handleSave}
        onDelete={confirmDelete}
        onDeleteLogo={handleDeleteLogo}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        beneficioName={selectedBeneficio?.companyName}
      />
    </main>
  );
}
