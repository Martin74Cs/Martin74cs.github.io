import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import { ContentDetail } from './types';
import { CONTENT_ITEMS } from './contentData';

function App() {
  // Inicializace přímo s aktuální konfigurací položek menu z contentData.ts
  const [items] = useState<ContentDetail[]>(CONTENT_ITEMS);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(0);
  const [selectedContentDetail, setSelectedContentDetail] = useState<ContentDetail | null>(CONTENT_ITEMS[0] || null);

  // Aktualizace vybraného detailu při změně indexu
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