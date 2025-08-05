import { useState, useEffect } from 'react';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import SearchResults from './components/SearchResults'; 
import PlaylistPanel from './components/PlaylistPanel'; 

//  dados da música da API da Deezer
export interface Musica {
  id: number;
  title: string;
  artist: { name: string; };
  album: { cover_medium: string; };
  preview: string;
}

// Playlist, vinda do nosso backend
export interface Playlist {
  id: number; 
  title: string;
  songs: Musica[];
}

function App() {
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // buscar as playlists já salvas no backend
  const buscarPlaylists = async () => {
    try {
      // precisa do token para playlist no deezer
      const token = localStorage.getItem('authToken');
      if (!token) return; // Não busca se não houver token

      const resposta = await fetch('http://localhost:3333/playlist', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!resposta.ok) throw new Error('Falha ao buscar playlists');
      
      const dados = await resposta.json();
      setPlaylists(dados);
    } catch (err) {
      console.error("Erro ao buscar playlists:", err);
    }
  };

  // buscar as playlists salvas assim que o app carregar
  useEffect(() => {
    buscarPlaylists();
  }, []); //[] roda só uma vez

  const buscarMusica = async () => {
    if (!termoDeBusca) return;
    setEstaCarregando(true);
    setErro(null);
    setMusicas([]);
    try {
      const resposta = await fetch(`/api/search?q=${termoDeBusca}`);
      const dados = await resposta.json();
      if (dados.data && dados.data.length > 0) {
        setMusicas(dados.data);
      } else {
        setErro("Nenhuma música encontrada.");
      }
    } catch (e) {
      setErro("Não foi possível conectar à API.");
    } finally {
      setEstaCarregando(false);
    }
  };

  //  criar uma nova playlist no backend
  const criarNovaPlaylist = async () => {
    const nomeDaPlaylist = prompt("Qual o nome da nova playlist?");
    if (nomeDaPlaylist) {
      try {
        const token = localStorage.getItem('authToken');
        const resposta = await fetch('http://localhost:3333/playlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ title: nomeDaPlaylist }), 
        });

        if (!resposta.ok) throw new Error('Falha ao criar a playlist');
        
        // Após criar, busca a lista de playlists novamente para atualizar a tela
        buscarPlaylists(); 
      } catch (err) {
        console.error(err);
        alert("Erro ao criar a playlist.");
      }
    }
  };
  
  // adicionar uma música a uma playlist no backend
  const adicionarMusicaPlaylist = async (musica: Musica) => {
    if (playlists.length === 0) {
      alert("Crie uma playlist primeiro!");
      return;
    }
    const idDaPlaylist = playlists[0].id; // Adicionando na primeira playlist 

    try {
      const token = localStorage.getItem('authToken');
      await fetch(`http://localhost:3333/playlist/${idDaPlaylist}/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          deezerId: String(musica.id),
          title: musica.title,
          artist: musica.artist.name,
          albumCover: musica.album.cover_medium,
        }),
      });

      alert(`Música "${musica.title}" adicionada à playlist "${playlists[0].title}"!`);
      // Atualiza a lista de playlists para mostrar a nova contagem de músicas
      buscarPlaylists();
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar música.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header 
        termoDeBusca={termoDeBusca}
        setTermoDeBusca={setTermoDeBusca}
        buscarMusica={buscarMusica}
        estaCarregando={estaCarregando}
      />

      <main className="flex-grow container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {estaCarregando && <p className="text-center text-gray-400">Carregando...</p>}
          {erro && <p className="text-center text-red-500">{erro}</p>}
          <SearchResults 
            musicas={musicas}
            onAdicionarMusica={adicionarMusicaPlaylist}
          />
        </div>
        <div className="md:col-span-1">
          <PlaylistPanel playlists={playlists} onCriarPlaylist={criarNovaPlaylist} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
