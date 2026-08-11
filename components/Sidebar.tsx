import React from 'react';
import { ContentDetail } from '../types';

interface SidebarProps {
  items: ContentDetail[];
  selectedItemIndex: number | null;
  onSelect: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, selectedItemIndex, onSelect }) => {
  /**
   * Získání ikony podle typu a ID položky
   */
  const getItemIcon = (item: ContentDetail) => {
    if (item.type === 'obsidian' || item.id === 'obsidian-notes') return '📚';
    if (item.id === 'home') return '🏠';
    if (item.id === 'zkratove-proudy') return '⚡';
    if (item.id === 'gravitacni-hriste') return '🚀';
    if (item.id === 'cerpadlo') return '🚰';
    if (item.id === 'celularni-automat') return '🧬';
    if (item.id === 'kompenzace') return '🔋';
    if (item.id === 'vetknuty-nosnik') return '🏗️';
    if (item.id === 'github-profile') return '🐙';
    if (item.id === 'seznam') return '🔍';
    if (item.id === 'profile') return '👤';
    if (item.id === 'settings') return '⚙️';
    if (item.id === 'messages') return '✉️';
    if (item.id === 'reports') return '📊';
    if (item.id === 'help') return '❓';
    if (item.url) return '🌐';
    return '📌';
  };

  return (
    <div className="w-full sm:w-64 bg-gray-800 text-white flex flex-col h-full overflow-y-auto shadow-lg p-4 md:p-6">
      <div className="mb-6 text-center border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-indigo-300">Martin74Cs Web</h2>
        <p className="text-xs text-gray-400 mt-1">Rozcestník & Obsidian Trezor</p>
      </div>

      <nav className="flex flex-col space-y-2">
        {items.map((item, index) => (
          <button
            key={item.id || index}
            onClick={() => onSelect(index)}
            className={`
              flex items-center px-4 py-3 rounded-lg text-base font-medium
              transition-all duration-200 ease-in-out text-left
              ${selectedItemIndex === index
                ? 'bg-indigo-600 text-white shadow-md transform scale-102'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
              active:bg-indigo-700
            `}
          >
            <span className="mr-3 text-xl">{getItemIcon(item)}</span>
            <span className="truncate">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;