import React from 'react';
import { Instagram } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black bg-opacity-30 backdrop-blur-md py-4 sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Instagram size={28} className="text-pink-500" />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Instagram Profile Finder
          </h1>
        </div>
        <div className="text-sm md:text-base">
          <span className="hidden md:inline text-purple-200">Find professionals on </span>
          <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Instagram</span>
        </div>
      </div>
    </header>
  );
};

export default Header;