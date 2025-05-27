import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { searchInstagramProfiles } from '../services/api';
import { InstagramProfile, SearchParams } from '../types';

const SearchContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<InstagramProfile[]>([]);
  const [lastSearch, setLastSearch] = useState<SearchParams | null>(null);
  
  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await searchInstagramProfiles(params);
      setProfiles(results.profiles);
      setLastSearch(params);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setProfiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-100">
          Search for Instagram Profiles
        </h2>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </section>
      
      <section>
        <SearchResults 
          profiles={profiles}
          isLoading={isLoading}
          error={error}
          lastSearch={lastSearch}
        />
      </section>
    </div>
  );
};

export default SearchContainer;