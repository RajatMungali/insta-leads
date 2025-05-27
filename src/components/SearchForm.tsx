import React, { useState } from 'react';
import { SearchIcon, MapPin, Briefcase, Loader } from 'lucide-react';
import { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && keyword.trim()) {
      onSearch({ city: city.trim(), keyword: keyword.trim() });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-black bg-opacity-30 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-purple-900/20"
    >
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="keyword" className="block text-sm font-medium text-purple-200 mb-1">
            Profession or Niche
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase size={18} className="text-purple-400" />
            </div>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="landscape designer, photographer, etc."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-white"
              required
            />
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="city" className="block text-sm font-medium text-purple-200 mb-1">
            City or Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-purple-400" />
            </div>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Austin, TX"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-white"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !city.trim() || !keyword.trim()}
        className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
          isLoading || !city.trim() || !keyword.trim()
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/20'
        }`}
      >
        {isLoading ? (
          <>
            <Loader size={20} className="animate-spin mr-2" />
            Searching...
          </>
        ) : (
          <>
            <SearchIcon size={20} className="mr-2" />
            Find Instagram Profiles
          </>
        )}
      </button>
    </form>
  );
};

export default SearchForm;