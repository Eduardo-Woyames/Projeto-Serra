
import logoserrajr from '../assets/logoserrajr.png';

//  props que o Header vai receber do App.tsx
interface HeaderProps {
  termoDeBusca: string;
  setTermoDeBusca: (value: string) => void;
  buscarMusica: () => void;
  estaCarregando: boolean;
}

// recebemos as props aqui
function Header({ termoDeBusca, setTermoDeBusca, buscarMusica, estaCarregando }: HeaderProps) {
  return (
    <header className="w-full bg-slate-500 text-black p-4">
     
      <div className="container mx-auto flex justify-between items-center gap-4">
        
       
        <div className="flex items-center gap-5">
          <img src={logoserrajr} className="h-12 w-12 mr-4" alt="Logo" />
          <input 
            type="text" 
            className="flex-grow p-3 border-2 border-gray-600 bg-gray-800 text-white rounded-full focus:outline-none focus:border-white"
            placeholder="Nome da Música..."
            value={termoDeBusca}
            onChange={(e) => setTermoDeBusca(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarMusica()}
          />
          <button
            onClick={buscarMusica}
            className="bg-gray-800 text-white font-bold p-3 px-6 rounded-full hover:bg-gray-700 transition-colors"
            disabled={estaCarregando}
          >
            {estaCarregando ? "..." : "Pesquisar"}
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;