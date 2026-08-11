import React, { useState } from 'react';
import { ContentDetail } from '../types';
import ObsidianViewer from './ObsidianViewer';

interface ContentAreaProps {
  selectedContentDetail: ContentDetail | null;
}

const ContentArea: React.FC<ContentAreaProps> = ({ selectedContentDetail }) => {
  const [iframeError, setIframeError] = useState<boolean>(false);

  if (!selectedContentDetail) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gray-50 text-gray-600">
        <p className="text-xl md:text-2xl font-medium text-center max-w-md">
          Prosím, vyberte položku z menu na levé straně, abyste viděli její obsah.
        </p>
      </div>
    );
  }

  // Pokud se jedná o zobrazení poznámek z repozitáře Obsidian
  if (selectedContentDetail.type === 'obsidian') {
    return <ObsidianViewer />;
  }

  // Pokud položka obsahuje externí nebo interní URL
  if (selectedContentDetail.url) {
    return (
      <div className="flex-1 flex flex-col h-full bg-gray-100 overflow-hidden">
        {/* Lišta s informacemi a tlačítkem pro otevření odkazu */}
        <div className="bg-gray-800 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2 shadow-md">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🌐</span>
            <span className="font-semibold text-indigo-300">{selectedContentDetail.name}</span>
            <span className="text-xs text-gray-400 hidden sm:inline font-mono">({selectedContentDetail.url})</span>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={selectedContentDetail.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-3 py-1.5 rounded font-medium transition flex items-center shadow"
            >
              <span className="mr-1">↗️</span> Otevřít na nové záložce
            </a>
          </div>
        </div>

        {/* Upozornění pokud stránka blokuje načítání v iframe */}
        <div className="bg-indigo-50 text-indigo-900 border-b border-indigo-100 px-4 py-2 text-xs flex items-center justify-between">
          <span>
            💡 Pokud se náhled stránky níže nenačítá (např. kvůli zabezpečení stránek jako Seznam.cz), klikněte na tlačítko <strong>"Otevřít na nové záložce"</strong> výše.
          </span>
        </div>

        {/* Náhled stránky v iframe */}
        <div className="flex-1 relative w-full h-full">
          <iframe
            src={selectedContentDetail.url}
            title={selectedContentDetail.name}
            className="w-full h-full border-0"
            allow="fullscreen"
            onError={() => setIframeError(true)}
          ></iframe>
        </div>
      </div>
    );
  }

  // Standardní zobrazení položky s popisem a obrázkem
  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          {selectedContentDetail.name}
        </h1>
        {selectedContentDetail.imageUrl && (
          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <img
              src={selectedContentDetail.imageUrl}
              alt={selectedContentDetail.name}
              className="w-full h-48 sm:h-64 object-cover"
              loading="lazy"
            />
          </div>
        )}
        <p className="text-base md:text-lg leading-relaxed text-gray-700">
          {selectedContentDetail.description}
        </p>
        {selectedContentDetail.additionalInfo && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Další informace</h2>
            <p className="text-gray-600">
              {selectedContentDetail.additionalInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentArea;