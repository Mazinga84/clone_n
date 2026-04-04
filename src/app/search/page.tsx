'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchMovies, Movie } from '@/data/movies';

// Netflix logo SVG - exact replica
const NetflixLogo = () => (
  <svg
    viewBox="0 0 111 30"
    className="h-7 w-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.531-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.405zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 0v21.875c5.219.02 10.438.07 15.656.125-.02-7.938-.02-15.875-.032-23.812V0H30.75zm-6.75 0v21.875c5.25.032 10.5.062 15.75.093-.022-7.781-.044-15.625-.062-23.406V0H24zM0 0h4.5v27.25c-1.593.218-3.187.406-4.5.594V0z"
      fill="#E50914"
    />
  </svg>
);

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchMovies(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#141414] border-b border-white/10">
        <div className="px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => router.push('/browse')}>
              <NetflixLogo />
            </button>
            <h1 className="text-white text-xl font-medium hidden md:block">Search</h1>
          </div>
        </div>
      </div>

      {/* Search Area */}
      <div className="pt-8 px-6 md:px-12">
        {/* Search Input */}
        <div className="max-w-4xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            placeholder="Titles, people, genres"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#2A2A2A] border border-white/20 rounded px-5 py-3.5 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="max-w-7xl mx-auto mt-8 pb-12">
          {query && results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map((movie) => (
                <div
                  key={movie.id}
                  className="cursor-pointer group"
                  onClick={() => router.push(`/detail/${movie.id}`)}
                >
                  <div className="relative w-full aspect-[2/3] rounded overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-white text-sm font-medium truncate group-hover:text-gray-300 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span className="text-green-500">{movie.match}%</span>
                      <span>{movie.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-white text-xl mb-2">No results for "{query}"</h2>
              <p className="text-gray-400">Try searching with different keywords.</p>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-white text-xl mb-2">Search for movies and TV shows</h2>
              <p className="text-gray-400">Start typing to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
