'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Info, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Movie, allMovies } from '@/data/movies';
import { useMyListStore } from '@/store/myList';

export default function Hero() {
  const router = useRouter();
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const { isInList, addToList, removeFromList } = useMyListStore();

  useEffect(() => {
    const highRated = allMovies.filter(m => (m.match || 0) >= 95);
    const randomMovie = highRated[Math.floor(Math.random() * highRated.length)];
    setFeaturedMovie(randomMovie);
  }, []);

  if (!featuredMovie) {
    return (
      <div className="relative h-[80vh] bg-[#0A0A0A] animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/60 to-transparent" />
      </div>
    );
  }

  const movieInList = isInList(featuredMovie.id);

  const toggleMyList = () => {
    if (movieInList) {
      removeFromList(featuredMovie.id);
    } else {
      addToList(featuredMovie);
    }
  };

  return (
    <div className="relative h-[80vh] min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredMovie.backdrop}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays - exact Netflix style */}
        <div className="absolute inset-0 bg-gradient-to-right from-[#141414] via-[#141414]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-16">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Tags row */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg font-semibold text-white">
              {featuredMovie.title}
            </span>
            <span className="text-green-500 text-sm font-medium">
              {featuredMovie.match}% Match
            </span>
            <span className="text-sm text-gray-300">{featuredMovie.year}</span>
            <span className="border border-gray-400 text-gray-300 px-1.5 text-xs">
              {featuredMovie.rating}
            </span>
            <span className="text-sm text-gray-300">
              {featuredMovie.duration || (featuredMovie.episodes ? `${featuredMovie.episodes} Episodes` : '')}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-base md:text-lg mb-6 leading-relaxed line-clamp-3">
            {featuredMovie.description}
          </p>

          {/* Genres */}
          <div className="flex items-center gap-2 mb-6">
            {featuredMovie.genres.slice(0, 4).map((genre, index) => (
              <span key={genre}>
                <span className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                  {genre}
                </span>
                {index < Math.min(featuredMovie.genres.length, 4) - 1 && (
                  <span className="text-gray-600 mx-1">•</span>
                )}
              </span>
            ))}
          </div>

          {/* Action Buttons - exact Netflix style */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/player')}
              className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 rounded font-medium text-base hover:bg-white/90 transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              Play
            </button>

            <button
              onClick={() => router.push(`/detail/${featuredMovie.id}`)}
              className="flex items-center gap-2 bg-gray-500/60 text-white px-6 md:px-8 py-2 rounded font-medium text-base hover:bg-gray-500/80 transition-colors"
            >
              <Info className="w-5 h-5" />
              More Info
            </button>

            <button
              onClick={toggleMyList}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                movieInList
                  ? 'border-gray-300 bg-black/40 text-gray-300'
                  : 'border-gray-400 text-gray-300 hover:border-white hover:text-white'
              }`}
              aria-label={movieInList ? 'Remove from My List' : 'Add to My List'}
            >
              <Plus className={`w-5 h-5 ${movieInList ? 'rotate-45' : ''}`} />
            </button>

            <button 
              className="hidden md:flex w-10 h-10 rounded-full border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white transition-colors items-center justify-center"
              aria-label="Like"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Age rating badge at bottom right */}
      <div className="absolute bottom-8 right-0 md:right-12 z-10">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:border-white transition-colors group">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
