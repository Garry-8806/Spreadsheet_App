import { ReactNode } from 'react';
import Toolbar from './Toolbar';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl">Spreadsheet App</h1>
      </header>
      <main className="flex-1 p-4">
        <Toolbar />
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Spreadsheet App
      </footer>
    </div>
  );
};

export default Layout;
