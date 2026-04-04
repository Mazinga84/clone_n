'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getMovieById, getSimilarMovies, Movie } from '@/data/movies';
import { useMyListStore } from '@/store/myList';
import Navbar from '@/components/Navbar';

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

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const { isInList, addToList, removeFromList } = useMyListStore();

  useEffect(() => {
    const movieId = params.id as string;
    const foundMovie = getMovieById(movieId);
    setMovie(foundMovie || null);
    if (foundMovie) {
      setSimilarMovies(getSimilarMovies(movieId));
    }
  }, [params.id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full" />
      </div>
    );
  }

  const isAdded = isInList(movie.id);

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="relative h-[60vh] min-h-[400px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${movie.backdrop}')` }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/30" />
        </div>

        {/* Content overlay */}
        <div className="absolute top-24 left-0 right-0 px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
            
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-green-500 font-semibold text-lg">{movie.match}% Match</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="border border-gray-400 text-gray-300 text-sm px-2 py-0.5">{movie.rating}</span>
              <span className="text-gray-300">{movie.duration || `${movie.episodes} Episodes`}</span>
            </div>

            {/* Description */}
            <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
              {movie.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button 
                className="flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded font-semibold text-lg hover:bg-gray-200 transition-colors"
                onClick={() => router.push('/player')}
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              
              <button 
                className={`flex items-center gap-2 px-5 py-2.5 rounded font-medium text-base transition-colors border ${
                  isAdded 
                    ? 'bg-[#E50914] border-[#E50914] text-white' 
                    : 'bg-gray-600/60 border-gray-500 text-white hover:bg-gray-500'
                }`}
                onClick={() => {
                  if (isAdded) {
                    removeFromList(movie.id);
                  } else {
                    addToList(movie);
                  }
                }}
              >
                <svg className="w-5 h-5" fill={isAdded ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {isAdded ? 'Added' : 'My List'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Cast */}
            <div className="mb-8">
              <h2 className="text-xl text-white mb-4">Cast</h2>
              <div className="flex flex-wrap gap-4">
                {movie.cast.slice(0, 6).map((actor) => (
                  <div key={actor} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-gray-400 text-sm">
                      {actor.charAt(0)}
                    </div>
                    <span className="text-gray-300 text-sm">{actor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Genres */}
            <div className="mb-6">
              <h3 className="text-gray-400 text-sm mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre} className="text-gray-300 text-sm hover:underline cursor-pointer">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Director */}
            {movie.director && (
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-3">Director</h3>
                <p className="text-gray-300 text-sm">{movie.director}</p>
              </div>
            )}

            {/* Related */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3">This title is</h3>
              <div className="flex flex-col gap-1 text-gray-300 text-sm">
                <span className="hover:underline cursor-pointer">{movie.genres[0]}</span>
                <span className="hover:underline cursor-pointer">{movie.type === 'movie' ? 'Movies' : 'TV Shows'}</span>
                <span className="hover:underline cursor-pointer">Exciting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Titles */}
        {similarMovies.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl text-white mb-6">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarMovies.map((simMovie) => (
                <div
                  key={simMovie.id}
                  className="cursor-pointer group"
                  onClick={() => router.push(`/detail/${simMovie.id}`)}
                >
                  <div className="relative w-full aspect-[2/3] rounded overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={simMovie.poster}
                      alt={simMovie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-white text-sm font-medium truncate group-hover:text-gray-300 transition-colors">
                      {simMovie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span className="text-green-500">{simMovie.match}%</span>
                      <span>{simMovie.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
