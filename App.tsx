import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import { ContentDetail } from './types';

function App() {
  const [items, setItems] = useState<ContentDetail[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [selectedContentDetail, setSelectedContentDetail] = useState<ContentDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Načtení dat z externího JSON souboru
  useEffect(() => {
    // Použití BASE_URL z Vite pro správnou cestu a přidání timestampu pro zamezení cache
    const baseUrl = import.meta.env.BASE_URL === './' ? '' : import.meta.env.BASE_URL;
    const contentUrl = `${baseUrl}content.json?t=${new Date().getTime()}`;

    console.log("Pokus o načtení dat z:", contentUrl);

    fetch(contentUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Nepodařilo se načíst soubor (Status: ${response.status}).`);
        }
        return response.json();
      })
      .then((data: ContentDetail[]) => {
        setItems(data);
        if (data.length > 0) {
          setSelectedItemIndex(0);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Chyba při načítání dat:", err);
        setError(`Nepodařilo se načíst obsah aplikace: ${err.message}`);
        setLoading(false);
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
        <div className="text-xl">Načítání aplikace...</div>
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