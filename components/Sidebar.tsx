import React from 'react';
import { ContentDetail } from '../types';

interface SidebarProps {
  items: ContentDetail[];
  selectedItemIndex: number | null; // Nyní index vybrané položky
  onSelect: (index: number) => void; // Nyní přijímá index
}

const Sidebar: React.FC<SidebarProps> = ({ items, selectedItemIndex, onSelect }) => {
  return (
    <div className="w-full sm:w-64 bg-gray-800 text-white flex flex-col h-full overflow-y-auto shadow-lg p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-300">ElektroVzorce</h2>
      <nav className="flex flex-col space-y-2">
        {items.map((item, index) => ( // Přidán index
          <button
            key={index} // Klíč by měl být unikátní, takže index je vhodný
            onClick={() => onSelect(index)} // Předává index
            className={`
              flex items-center px-4 py-3 rounded-lg text-lg
              transition-all duration-200 ease-in-out
              ${selectedItemIndex === index // Porovnáváme indexy
                ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
              active:bg-indigo-700
            `}
          >
            {/* Simple placeholder icon, replace with actual icons if needed */}
            <span className="mr-3 text-xl">
              {item.id === 'uvod' && '⚡'}
              {item.id === 'norma' && '📘'}
              {item.id === 'kalkulacka' && '🧮'}
              {item.id === 'postup' && '🧭'}
              {item.id === 'kontakt' && '✉️'}
              {!['uvod', 'norma', 'kalkulacka', 'postup', 'kontakt'].includes(item.id) && '➡️'}
            </span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
