
import MusicCard from './MusicCard'; 


interface Music {
  id: number; 
  title: string;
  artist: {
    name: string;
  };
  album: {
    cover_medium: string;
  };
  preview: string;
}


interface SearchResultsProps {
  musicas: Music[];
}

interface SearchResultsProps {
  musicas: Music[];
  onAdicionarMusica: (musica: Music) => void;
}

function SearchResults({ musicas, onAdicionarMusica }: SearchResultsProps) {
  return (
    <div className="bg-gray-800 p-8 rounded-lg w-full h-full">
      {musicas.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl font-bold text-gray-400">O que você quer ouvir hoje?</h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {musicas.map((musica) => (
            <MusicCard
              key={musica.id}
              title={musica.title}
              artistName={musica.artist.name}
              albumCover={musica.album.cover_medium}
              previewUrl={musica.preview}
              onAddToPlaylist={() => onAdicionarMusica(musica)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;