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
      className={`relative ${width} ${height} flex-shrink-0 rounded overflow-hidden transition-all duration-300 cursor-pointer group ${
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

      {/* Hover overlay - Netflix style */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Title and info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white truncate mb-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            {movie.match && (
              <span className="text-green-500 font-medium">{movie.match}%</span>
            )}
            <span>{movie.rating}</span>
            <span>{movie.year}</span>
          </div>
        </div>

        {/* Action buttons at top right */}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); router.push('/player'); }}
            className="w-7 h-7 rounded-full bg-black/60 border border-white/50 flex items-center justify-center hover:bg-black hover:border-white transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-white fill-current" />
          </button>

          <button
            onClick={toggleMyList}
            className={`w-7 h-7 rounded-full bg-black/60 border border-white/50 flex items-center justify-center hover:bg-black hover:border-white transition-colors ${
              movieInList ? 'bg-black' : ''
            }`}
          >
            <Plus className={`w-3.5 h-3.5 text-white ${movieInList ? 'rotate-45' : ''}`} />
          </button>

          <button className="w-7 h-7 rounded-full bg-black/60 border border-white/50 flex items-center justify-center hover:bg-black hover:border-white transition-colors">
            <ThumbsUp className="w-3 h-3 text-white" />
          </button>

          <button className="w-7 h-7 rounded-full bg-black/60 border border-white/50 flex items-center justify-center hover:bg-black hover:border-white transition-colors">
            <ChevronDown className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
