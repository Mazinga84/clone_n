'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Movie } from '@/data/movies';
import { useMyListStore } from '@/store/myList';

interface MovieCardProps {
  movie: Movie;
  size?: 'normal' | 'large';
}

export default function MovieCard({ movie, size = 'normal' }: MovieCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const { isInList, addToList, removeFromList } = useMyListStore();
  const movieInList = isInList(movie.id);

  const toggleMyList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (movieInList) {
      removeFromList(movie.id);
    } else {
      addToList(movie);
    }
  };

  const width = size === 'large' ? 'w-64' : 'w-44';
  const height = size === 'large' ? 'h-72' : 'h-56';

  return (
    <div
      className={`relative ${width} ${height} flex-shrink-0 rounded overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? 'scale-110 z-20' : 'scale-100 z-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/detail/${movie.id}`)}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-2 left-2 right-2">
          <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
            {movie.match && (
              <span className="text-green-500 font-medium">
                {movie.match}% Match
              </span>
            )}
            <span>{movie.rating}</span>
            <span>{movie.year}</span>
          </div>
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); router.push('/player'); }}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Play className="w-4 h-4 text-black fill-black" />
            </button>

            <button
              onClick={toggleMyList}
              className={`w-7 h-7 rounded-full border border-white/50 flex items-center justify-center hover:border-white transition-colors ${
                movieInList ? 'bg-white/20' : ''
              }`}
            >
              <Plus className={`w-4 h-4 ${movieInList ? 'rotate-45' : ''}`} />
            </button>

            <button className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center hover:border-white transition-colors">
              <ThumbsUp className="w-4 h-4" />
            </button>
          </div>

          <button className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center hover:border-white transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-12 left-2 right-2">
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs text-gray-300 border border-white/30 px-1 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
