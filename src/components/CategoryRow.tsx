'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '@/data/movies';
import MovieCard from './MovieCard';

interface CategoryRowProps {
  category: Category;
}

export default function CategoryRow({ category }: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative group mb-8">
      <h2 className="text-xl font-semibold mb-2 px-12 hover:text-gray-300 transition-colors cursor-pointer">
        {category.name}
      </h2>

      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-12 bottom-0 w-12 bg-black/50 hover:bg-black/80 z-10 flex items-center justify-center transition-opacity ${
          showLeftArrow ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto px-12 py-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {category.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-12 bottom-0 w-12 bg-black/50 hover:bg-black/80 z-10 flex items-center justify-center transition-opacity ${
          showRightArrow ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
