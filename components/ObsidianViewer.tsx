import React, { useState, useEffect } from 'react';
import { ObsidianNode } from '../types';

interface ObsidianViewerProps {
  initialData?: ObsidianNode[];
}

/**
 * Komponenta pro prohlížení a vyhledávání poznámek z repozitáře Obsidian.
 */
const ObsidianViewer: React.FC<ObsidianViewerProps> = () => {
  const [nodes, setNodes] = useState<ObsidianNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<ObsidianNode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL === './' ? '' : import.meta.env.BASE_URL || '';
    const dataUrl = `${baseUrl}obsidian-data.json?t=${new Date().getTime()}`;

    fetch(dataUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Nepodařilo se načíst poznámky z Obsidianu (${res.status}).`);
        }
        return res.json();
      })
      .then((data: ObsidianNode[]) => {
        setNodes(data);
        setLoading(false);
        // Automaticky rozbalit první úroveň složek
        const initialExpanded: Record<string, boolean> = {};
        data.forEach(node => {
          if (node.type === 'directory') {
            initialExpanded[node.path] = true;
          }
        });
        setExpandedFolders(initialExpanded);

        // Pokud existuje nějaká poznámka, vybrat první
        const firstFile = findFirstFile(data);
        if (firstFile) {
          setSelectedFile(firstFile);
        }
      })
      .catch((err) => {
        console.error('Chyba při načítání Obsidian dat:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  /**
   * Pomocná funkce pro vyhledání prvního souboru ve stromu
   */
  const findFirstFile = (itemList: ObsidianNode[]): ObsidianNode | null => {
    for (const item of itemList) {
      if (item.type === 'file') return item;
      if (item.children) {
        const found = findFirstFile(item.children);
        if (found) return found;
      }
    }
    return null;
  };

  /**
   * Přepínání rozbalení/zabalení složky
   */
  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  /**
   * Jednoduchý parser Markdownu pro zobrazení obsahu poznámky
   */
  const renderMarkdown = (content: string) => {
    if (!content) return <p className="text-gray-500 italic">Tato poznámka je prázdná.</p>;

    const lines = content.split('\n');
    return (
      <div className="space-y-3 font-sans text-gray-800 leading-relaxed">
        {lines.map((line, index) => {
          const trimmed = line.trim();

          // Nadpisy
          if (trimmed.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-bold text-indigo-900 border-b pb-2 mt-4">{trimmed.replace('# ', '')}</h1>;
          }
          if (trimmed.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-bold text-indigo-800 border-b pb-1 mt-3">{trimmed.replace('## ', '')}</h2>;
          }
          if (trimmed.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-semibold text-gray-800 mt-2">{trimmed.replace('### ', '')}</h3>;
          }

          // Seznamy a úkoly
          if (trimmed.startsWith('- [x]') || trimmed.startsWith('- [ ]')) {
            const checked = trimmed.startsWith('- [x]');
            const text = trimmed.replace(/- \[(x| )\]/, '');
            return (
              <div key={index} className="flex items-center space-x-2 my-1 pl-2">
                <input type="checkbox" checked={checked} readOnly className="h-4 w-4 text-indigo-600 rounded" />
                <span className={checked ? 'line-through text-gray-400' : 'text-gray-700'}>{text}</span>
              </div>
            );
          }

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <li key={index} className="ml-5 list-disc text-gray-700">
                {trimmed.substring(2)}
              </li>
            );
          }

          // Kódové bloky / řádkový kód
          if (trimmed.startsWith('```')) {
            return <div key={index} className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto my-2">{trimmed}</div>;
          }

          // Vodorovná čára
          if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
            return <hr key={index} className="my-4 border-gray-300" />;
          }

          // Prázdný řádek
          if (!trimmed) {
            return <div key={index} className="h-2"></div>;
          }

          // Běžný odstavec
          return (
            <p key={index} className="text-gray-700">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  /**
   * Rekurzivní vykreslení stromu složek a souborů s filtry
   */
  const renderTree = (itemList: ObsidianNode[]) => {
    return (
      <ul className="space-y-1 pl-2 border-l border-gray-700">
        {itemList.map((node) => {
          // Vyhledávání
          if (searchQuery.trim()) {
            const matchesQuery = node.name.toLowerCase().includes(searchQuery.toLowerCase());
            if (node.type === 'file' && !matchesQuery) return null;
          }

          if (node.type === 'directory') {
            const isExpanded = expandedFolders[node.path] || searchQuery.trim().length > 0;
            return (
              <li key={node.path} className="my-1">
                <button
                  onClick={() => toggleFolder(node.path)}
                  className="flex items-center w-full text-left py-1 px-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-700 rounded transition"
                >
                  <span className="mr-2 text-yellow-400">{isExpanded ? '📂' : '📁'}</span>
                  <span className="truncate">{node.name}</span>
                </button>
                {isExpanded && node.children && (
                  <div className="ml-2 mt-1">{renderTree(node.children)}</div>
                )}
              </li>
            );
          }

          const isSelected = selectedFile?.path === node.path;
          return (
            <li key={node.path}>
              <button
                onClick={() => setSelectedFile(node)}
                className={`flex items-center w-full text-left py-1.5 px-2 text-sm rounded transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-medium shadow'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-2 text-indigo-300">📝</span>
                <span className="truncate">{node.title || node.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 text-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p>Načítání poznámek z repozitáře Obsidian...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50 text-red-600">
        <div className="text-center max-w-md bg-red-50 p-6 rounded-lg border border-red-200 shadow">
          <p className="font-bold text-lg mb-2">Chyba při načítání poznámek</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-gray-100">
      {/* Levý panel - Strom poznámek a hledání */}
      <div className="w-full md:w-80 bg-gray-900 text-white flex flex-col border-r border-gray-800 h-full overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-bold text-indigo-300 mb-2 flex items-center">
            <span className="mr-2">📚</span> Obsidian Poznámky
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Hledat v poznámkách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white text-sm rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
            />
            <span className="absolute left-2.5 top-2 text-gray-400 text-xs">🔍</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {nodes.length > 0 ? renderTree(nodes) : <p className="text-gray-400 text-sm p-2">Žádné poznámky nenalezeny.</p>}
        </div>
      </div>

      {/* Pravý panel - Náhled a obsah vybrané poznámky */}
      <div className="flex-1 bg-white overflow-y-auto p-4 md:p-8">
        {selectedFile ? (
          <div className="max-w-4xl mx-auto">
            {/* Hlavička poznámky */}
            <div className="mb-6 border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  {selectedFile.path.split('/')[0]}
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">
                  {selectedFile.title || selectedFile.name}
                </h1>
                <p className="text-xs text-gray-500 mt-1 font-mono">{selectedFile.path}</p>
              </div>
              <a
                href={`https://github.com/Martin74Cs/Obsidian/blob/main/${encodeURIComponent(selectedFile.path)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-gray-600 hover:text-indigo-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded transition"
              >
                <span className="mr-1">🔗</span> Zobrazit na GitHubu
              </a>
            </div>

            {/* Obsah poznámky */}
            <div className="prose max-w-none bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              {renderMarkdown(selectedFile.content || '')}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-lg">Vyberte poznámku ze seznamu vlevo pro zobrazení obsahu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObsidianViewer;
