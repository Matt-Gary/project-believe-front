import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Eye, EyeOff } from 'lucide-react';

export default function PhotosGrid({
  photos,
  onDeletePhoto,
  onToggleVisibility,
}) {
  if (!photos || photos.length === 0) {
    return (
      <div className="text-center p-8 bg-zinc-800/50 rounded-lg mt-4">
        <p className="text-zinc-400">
          Nenhuma foto encontrada para este evento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-zinc-800 rounded-lg overflow-hidden group"
        >
          <div className="relative">
            <img
              src={photo.photo_url}
              alt={photo.photo_name || 'Foto de evento'}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 right-2">
              <span
                className={`inline-block px-2 py-1 rounded text-xs ${
                  photo.visibility === 'PUBLIC' ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {photo.visibility === 'PUBLIC' ? 'Pública' : 'Privada'}
              </span>
            </div>
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400 truncate">
                {photo.photo_name || 'Sem nome'}
              </span>
              <span className="text-xs text-zinc-500">
                {new Date(photo.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex space-x-2 mt-2">
              {onToggleVisibility && (
                <Button
                  onClick={() => onToggleVisibility(photo.id, photo.visibility)}
                  className="text-xs flex-1 bg-zinc-700 hover:bg-zinc-600 py-1 h-8"
                  title={
                    photo.visibility === 'PUBLIC'
                      ? 'Tornar Privada'
                      : 'Tornar Pública'
                  }
                >
                  {photo.visibility === 'PUBLIC' ? (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" /> Privada
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3 mr-1" /> Pública
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={() => onDeletePhoto(photo.id)}
                className="text-xs bg-red-600 hover:bg-red-700 py-1 h-8 px-3"
                title="Excluir foto"
              >
                <Trash2 className="h-3 w-3 mr-1" /> Excluir
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
