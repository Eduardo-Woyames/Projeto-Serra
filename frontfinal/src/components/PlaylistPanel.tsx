


interface Musica {
  id: number;
  title: string;
  artist: { name: string; };
  album: { cover_medium: string; };
  preview: string;
}

interface Playlist {
  id: number;
  title: string;
  songs: Musica[];
}

//  props que o componente espera receber
interface PlaylistPanelProps {
  playlists: Playlist[];
  onCriarPlaylist: () => void;
}

// Recebemos as props aqui
function PlaylistPanel({ playlists, onCriarPlaylist }: PlaylistPanelProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full h-full">
      <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
        <h3 className="text-xl font-bold text-white">Suas Playlists</h3>
        
        <button 
          onClick={onCriarPlaylist} 
          className="bg-gray-700 text-white rounded-full w-8 h-8 text-xl hover:bg-gray-600"
          title="Criar nova playlist"
        >
          +
        </button>
      </div>
      
      {playlists.length === 0 ? (
        <div className="text-center text-gray-400 mt-4">
          <p>Você ainda não possui playlists</p>
        </div>
      ) : (
        <div className="space-y-2 mt-4">
          {playlists.map(playlist => (
            <div key={playlist.id} className="bg-gray-700 p-2 rounded">
              <p className="text-white font-bold">{playlist.title}</p>
              {/* Exibe a contagem de músicas */}
              <p className="text-xs text-gray-400">{playlist.songs?.length || 0} músicas</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistPanel;
