import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black bg-opacity-40 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p className="flex items-center justify-center gap-1">
          Built with <Heart size={14} className="text-pink-500 animate-pulse" /> using SerpAPI
        </p>
        <p className="mt-1 text-xs">
          This tool helps find Instagram profiles via Google Search results. No direct Instagram API access.
        </p>
      </div>
    </footer>
  );
};

export default Footer;