
import React from 'react';
import { ContentDetail } from '../types';
import FormulaSectionList from './FormulaSectionList';

interface ContentAreaProps {
  selectedContentDetail: ContentDetail | null;
}

const ContentArea: React.FC<ContentAreaProps> = ({ selectedContentDetail }) => {
  if (!selectedContentDetail) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gray-50 text-gray-600">
        <p className="text-xl md:text-2xl font-medium text-center max-w-md">
          Prosím, vyberte položku z menu na levé straně, abyste viděli její obsah.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white overflow-y-auto"> {/* Odebráno padding odtud */}
      {selectedContentDetail.url ? (
        <iframe
          src={selectedContentDetail.url}
          title={selectedContentDetail.name}
          className="w-full h-full border-0"
          allowFullScreen
        ></iframe>
      ) : selectedContentDetail.type === 'formulas' ? (
        <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
          <header className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {selectedContentDetail.name}
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              {selectedContentDetail.description}
            </p>
            {selectedContentDetail.legalNotice && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                {selectedContentDetail.legalNotice}
              </div>
            )}
          </header>
          {selectedContentDetail.formulaSections && (
            <FormulaSectionList sections={selectedContentDetail.formulaSections} />
          )}
        </div>
      ) : (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto"> {/* Padding přidán zpět do vnitřního divu */}
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
          {selectedContentDetail.additionalInfo && ( // Render additional info if present
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Další informace</h2>
              <p className="text-gray-600">
                {selectedContentDetail.additionalInfo}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentArea;
