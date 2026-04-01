'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchMovies, Movie } from '@/data/movies';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('clonen-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchMovies(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('clonen-recent-searches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('clonen-recent-searches');
  };

  return (
    <div className="min-h-screen bg-[#141414] pt-24 px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Search</h1>
        
        {/* Search Input */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search for movies, shows, or actors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(query);
              }
            }}
            className="w-full bg-[#2A2A2A] border border-white/20 rounded-md px-6 py-4 text-white text-lg focus:outline-none focus:border-white transition-colors"
            autoFocus
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setQuery('')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-white">Recent Searches</h2>
              <button
                className="text-gray-400 hover:text-white text-sm"
                onClick={clearRecentSearches}
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="bg-[#2A2A2A] text-gray-300 px-4 py-2 rounded-md hover:bg-[#3A3A3A] transition-colors flex items-center gap-2"
                  onClick={() => setQuery(search)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div>
            <h2 className="text-xl text-white mb-6">
              {results.length > 0 
                ? `${results.length} results for "${query}"`
                : `No results for "${query}"`
              }
            </h2>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((movie) => (
                  <div
                    key={movie.id}
                    className="cursor-pointer group"
                    onClick={() => router.push(`/detail/${movie.id}`)}
                  >
                    <div className="relative w-full h-[280px] rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-white font-medium truncate">{movie.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <span className="text-green-500">{movie.match}%</span>
                        <span>{movie.year}</span>
                        <span className="border border-gray-500 text-xs px-1">{movie.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {movie.genres.slice(0, 2).map((genre) => (
                          <span key={genre} className="text-xs text-gray-500">{genre}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <svg className="w-24 h-24 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-2xl text-white mb-4">No titles found</h2>
                <p className="text-gray-400 text-center">
                  Try searching for different keywords or check your spelling.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Browse Categories */}
        {!query && (
          <div>
            <h2 className="text-xl text-white mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary', 'Animation'].map((genre) => (
                <button
                  key={genre}
                  className="bg-gradient-to-r from-red-800 to-red-600 text-white py-12 px-6 rounded-md font-semibold text-lg hover:scale-105 transition-transform"
                  onClick={() => setQuery(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
