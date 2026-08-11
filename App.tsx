import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import { ContentDetail } from './types';
import { CONTENT_ITEMS } from './contentData';

function App() {
  // Výchozí inicializace přímo s aktuální konfigurací položek menu
  const [items, setItems] = useState<ContentDetail[]>(CONTENT_ITEMS);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(0);
  const [selectedContentDetail, setSelectedContentDetail] = useState<ContentDetail | null>(CONTENT_ITEMS[0] || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pokus o případné dynamické dočtení z content.json (pokud existují externí změny)
  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL === './' ? '' : import.meta.env.BASE_URL || '';
    const contentUrl = `${baseUrl}content.json?t=${new Date().getTime()}`;

    fetch(contentUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: ContentDetail[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(err => {
        console.log("Používám vestavěná data položek menu:", err);
      });
  }, []);

  // Aktualizace detailů při změně indexu nebo dat
  useEffect(() => {
    if (selectedItemIndex !== null && items[selectedItemIndex]) {
      setSelectedContentDetail(items[selectedItemIndex]);
    } else {
      setSelectedContentDetail(null);
    }
  }, [selectedItemIndex, items]);

  const handleItemSelect = (index: number) => {
    setSelectedItemIndex(index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">
        <div className="text-xl font-medium">Načítání aplikace...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-red-600">
        <div className="text-xl font-bold">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full sm:w-64 flex-shrink-0">
        <Sidebar
          items={items}
          selectedItemIndex={selectedItemIndex}
          onSelect={handleItemSelect}
        />
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex overflow-hidden">
        <ContentArea selectedContentDetail={selectedContentDetail} />
      </main>
    </div>
  );
}

export default App;