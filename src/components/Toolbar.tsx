import React, { useState } from 'react';
import useStore from '../lib/store';
import "../styles/globals.css"

const Toolbar: React.FC = () => {
  const { undo, redo, setSearchTerm, setFormatting } = useStore();
  const [searchInput, setSearchInput] = useState('');
  const [textAlign, setTextAlign] = useState('text-left');
  const [fontSize, setFontSize] = useState('text-base');
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleApplyFormatting = () => {
    if (selectedCellIndex !== null) {
      setFormatting(selectedCellIndex, { textAlign, fontSize });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-200 shadow rounded space-x-4">
      <h1>Spreadsheet App</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="border p-2 rounded"/>
      
      <button onClick={undo} className="p-2 bg-blue-500 text-white rounded">Undo</button>
      <button onClick={redo} className="p-2 bg-blue-500 text-white rounded">Redo</button>
      <select value={textAlign} onChange={(e) => setTextAlign(e.target.value)} className="p-2 rounded">
        <option value="text-left">Left</option>
        <option value="text-center">Center</option>
        <option value="text-right">Right</option>
      </select>
      <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="p-2 rounded">
        <option value="text-xs">12px</option>
        <option value="text-base">16px</option>
        <option value="text-lg">20px</option>
      </select>
      <button onClick={handleApplyFormatting} className="p-2 bg-green-500 text-white rounded">Apply Formatting</button>
    </div>
  );
};

export default Toolbar;
