//import React from 'react';

// Este componente vai mostrar as playlists do usuário
function PlaylistPanel() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full h-full">
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray-300 bo">

        <h3 className="text-xl font-bold text-white">Suas Playlists</h3>
        <button className="bg-gray-700 text-white rounded-full w-8 h-8 text-xl hover:bg-gray-600 flex items-center justify-center">
          <span className="relative bottom-[2px]">+</span>
        </button>
      </div>
      <div className="text-center text-gray-400">
        <p>Você ainda não possui playlists</p>
      </div>
    </div>
  );
}

export default PlaylistPanel;