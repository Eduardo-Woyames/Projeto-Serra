import { useState, useRef, useEffect } from 'react';

// Definindo as props que o nosso card de música vai receber
interface MusicCardProps {
  title: string;
  artistName: string;
  albumCover: string;
  previewUrl: string; // Prop com o link do mp3
}

function MusicCard({ title, artistName, albumCover, previewUrl }: MusicCardProps) {
  // Estado para saber se a música está tocando ou não
  const [isPlaying, setIsPlaying] = useState(false);
  // Referência para controlar o elemento <audio> diretamente
  const audioRef = useRef<HTMLAudioElement>(null);

  // Função para tocar ou pausar a música
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Se estiver tocando, pausa
      } else {
        audioRef.current.play(); // Se estiver pausado, toca
      }
      setIsPlaying(!isPlaying); // Inverte o estado
    }
  };

  // Efeito para resetar o botão de play quando a prévia de 30s terminar
  useEffect(() => {
    const audioEl = audioRef.current;
    const onEnded = () => setIsPlaying(false);

    audioEl?.addEventListener('ended', onEnded);
    // Limpa o "escutador" quando o componente for desmontado
    return () => {
      audioEl?.removeEventListener('ended', onEnded);
    }
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg w-52 overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      {/* O elemento <audio> fica aqui, escondido. Ele contém a URL da prévia. */}
      <audio ref={audioRef} src={previewUrl} />

      <img src={albumCover} alt={`Capa do álbum de ${title}`} className="w-full h-52 object-cover" />
      
      <div className="p-4 text-white text-center flex flex-col flex-grow justify-center">
        <h3 className="text-md font-bold truncate" title={title}>{title}</h3>
        <p className="text-sm text-gray-400">{artistName}</p>
        
        {/* Botão de Tocar/Pausar com o ícone */}
        <button
          onClick={togglePlayPause}
          disabled={!previewUrl} // Desabilita o botão se não houver link para a prévia
          className="mt-4 mx-auto bg-blue-500 hover:bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-xl disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isPlaying ? '⏸️' : '🎵'}
        </button>
      </div>
    </div>
  );
}

export default MusicCard;