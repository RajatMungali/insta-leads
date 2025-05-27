import React from 'react';
import { Instagram, User, ExternalLink, AlertCircle, FileDown } from 'lucide-react';
import { InstagramProfile, SearchParams } from '../types';
import ProfileCard from './ProfileCard';

interface SearchResultsProps {
  profiles: InstagramProfile[];
  isLoading: boolean;
  error: string | null;
  lastSearch: SearchParams | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  profiles, 
  isLoading, 
  error, 
  lastSearch 
}) => {
  const saveProfiles = async () => {
    try {
      const response = await fetch('/api/save-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profiles),
      });
      
      if (response.ok) {
        alert('Profiles saved! You can now run the form filler script.');
      }
    } catch (error) {
      console.error('Error saving profiles:', error);
      alert('Error saving profiles. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-pink-500 border-opacity-50 animate-spin"></div>
          <Instagram size={32} className="absolute inset-0 m-auto text-white" />
        </div>
        <p className="mt-4 text-lg text-purple-200">Searching Instagram profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-6 text-center">
        <AlertCircle size={32} className="text-red-400 mx-auto mb-2" />
        <h3 className="text-lg font-medium text-red-300 mb-2">Search Error</h3>
        <p className="text-red-200">{error}</p>
      </div>
    );
  }

  if (profiles.length === 0 && !lastSearch) {
    return (
      <div className="bg-gray-800 bg-opacity-30 rounded-lg p-8 text-center">
        <User size={32} className="text-purple-400 mx-auto mb-3" />
        <h3 className="text-xl font-medium text-purple-200 mb-2">No Search Results Yet</h3>
        <p className="text-gray-300">
          Enter a profession/niche and location above to find Instagram profiles.
        </p>
      </div>
    );
  }

  if (profiles.length === 0 && lastSearch) {
    return (
      <div className="bg-gray-800 bg-opacity-30 rounded-lg p-8 text-center">
        <ExternalLink size={32} className="text-purple-400 mx-auto mb-3" />
        <h3 className="text-xl font-medium text-purple-200 mb-2">No Profiles Found</h3>
        <p className="text-gray-300">
          We couldn't find any Instagram profiles for {lastSearch.keyword} in {lastSearch.city}.
        </p>
        <p className="text-gray-400 mt-2">
          Try broadening your search or using different keywords.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-purple-100">
          Search Results <span className="text-sm text-purple-300">({profiles.length})</span>
        </h3>
        <div className="flex items-center gap-4">
          {lastSearch && (
            <p className="text-sm text-gray-400">
              <span className="font-medium text-pink-400">{lastSearch.keyword}</span> in 
              <span className="font-medium text-purple-400"> {lastSearch.city}</span>
            </p>
          )}
          <button
            onClick={saveProfiles}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
          >
            <FileDown size={16} />
            Save for Form
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.link} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;