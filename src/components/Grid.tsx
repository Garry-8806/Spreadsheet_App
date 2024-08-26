import React, { useState } from 'react';
import useStore from '../lib/store';


const ITEMS_PER_PAGE = 198;

const Grid: React.FC = () => {
  const { cells, setCell, searchTerm, cellFormats } = useStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setCell(index, event.target.value);
  };

  const handleCellClick = (index: number) => {
    setSelectedCellIndex(index);
  };

  const filteredCells = cells.filter(cell => cell.includes(searchTerm));
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCells = filteredCells.slice(startIndex, endIndex);

  return (
    <div className="relative">
      <div className="grid grid-cols-10 gap-1" style={{ gridTemplateRows: `repeat(${ITEMS_PER_PAGE / 10}, 40px)` }}>
        {currentCells.map((cell, index) => (
          <input
            key={index + startIndex}
            type="text"
            value={cell}
            onChange={(event) => handleChange(index + startIndex, event)}
            onClick={() => handleCellClick(index + startIndex)}
            className={`border p-2 ${cellFormats[index + startIndex]?.textAlign || 'text-left'} ${cellFormats[index + startIndex]?.fontSize || 'text-base'} ${selectedCellIndex === index + startIndex ? 'bg-blue-100' : ''}`}
            style={{ width: '100px', height: '40px', backgroundColor: '#fff' }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => (startIndex + ITEMS_PER_PAGE < filteredCells.length ? prev + 1 : prev))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Grid;
