import create from 'zustand';

interface CellFormat {
  textAlign: string;
  fontSize: string;
}

interface SpreadsheetState {
  cells: string[];
  cellFormats: { [key: number]: CellFormat };
  history: { cells: string[]; cellFormats: { [key: number]: CellFormat } }[];
  redoStack: { cells: string[]; cellFormats: { [key: number]: CellFormat } }[];
  searchTerm: string;
  setCell: (index: number, value: string) => void;
  setFormatting: (index: number, format: CellFormat) => void;
  undo: () => void;
  redo: () => void;
  setSearchTerm: (term: string) => void;
}

const useStore = create<SpreadsheetState>((set, get) => ({
  cells: Array(1000).fill(''),
  cellFormats: {},
  history: [],
  redoStack: [],
  searchTerm: '',

  setCell: (index, value) => {
    const { cells, cellFormats, history, redoStack } = get();
    const newCells = [...cells];
    newCells[index] = value;

    set({
      cells: newCells,
      history: [...history, { cells, cellFormats }],
      redoStack: [],
    });
  },

  setFormatting: (index, format) => {
    const { cells, cellFormats, history, redoStack } = get();
    const newCellFormats = { ...cellFormats, [index]: format };

    set({
      cellFormats: newCellFormats,
      history: [...history, { cells, cellFormats }],
      redoStack: [],
    });
  },

  undo: () => {
    const { history, redoStack } = get();
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      set({
        cells: lastState.cells,
        cellFormats: lastState.cellFormats,
        history: history.slice(0, -1),
        redoStack: [...redoStack, lastState],
      });
    }
  },

  redo: () => {
    const { history, redoStack } = get();
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      set({
        cells: nextState.cells,
        cellFormats: nextState.cellFormats,
        history: [...history, nextState],
        redoStack: redoStack.slice(0, -1),
      });
    }
  },

  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useStore;
