import { useState } from 'react';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import SearchResults from './components/SearchResults'; 
import PlaylistPanel from './components/PlaylistPanel'; 


interface Musica {
  id: number;
  title: string;
  artist: { name: string; };
  album: { cover_medium: string; };
  preview: string;
}


function App() {
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const buscarMusica = async () => {
    if (!termoDeBusca) return;
    setEstaCarregando(true);
    setErro(null);
    setMusicas([]);
    try {
      // Usando a API da Deezer através do proxy do Vite
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
          <SearchResults musicas={musicas} />
        </div>
        <div className="md:col-span-1">
          <PlaylistPanel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;