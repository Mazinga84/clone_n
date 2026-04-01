'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Info, Plus, ThumbsUp } from 'lucide-react';
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
      <div className="relative h-screen bg-[#0A0A0A] animate-pulse">
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
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src={featuredMovie.backdrop}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      <div className="relative z-10 h-full flex items-center px-12 lg:px-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-500 font-bold text-lg">
              {featuredMovie.match}% Match
            </span>
            <span className="text-gray-300">{featuredMovie.year}</span>
            <span className="border border-gray-400 text-gray-300 px-1 text-xs">
              {featuredMovie.rating}
            </span>
            {featuredMovie.duration && (
              <span className="text-gray-300">{featuredMovie.duration}</span>
            )}
            {featuredMovie.episodes && (
              <span className="text-gray-300">{featuredMovie.episodes} Episodes</span>
            )}
          </div>

          <h1 className="font-netflix text-5xl lg:text-7xl mb-4 tracking-tight">
            {featuredMovie.title}
          </h1>

          <p className="text-gray-200 text-lg mb-6 line-clamp-3">
            {featuredMovie.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {featuredMovie.genres.map((genre) => (
              <span
                key={genre}
                className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/player')}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-semibold text-lg hover:bg-gray-200 transition-colors"
            >
              <Play className="w-6 h-6 fill-current" />
              Play
            </button>

            <button
              onClick={() => router.push(`/detail/${featuredMovie.id}`)}
              className="flex items-center gap-2 bg-gray-500/50 text-white px-8 py-3 rounded font-semibold text-lg hover:bg-gray-500/70 transition-colors"
            >
              <Info className="w-6 h-6" />
              More Info
            </button>

            <button
              onClick={toggleMyList}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                movieInList
                  ? 'border-white bg-white/20 text-white'
                  : 'border-gray-400 text-gray-300 hover:border-white hover:text-white'
              }`}
            >
              <Plus className={`w-6 h-6 ${movieInList ? 'rotate-45' : ''}`} />
            </button>

            <button className="w-12 h-12 rounded-full border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white transition-colors flex items-center justify-center">
              <ThumbsUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
