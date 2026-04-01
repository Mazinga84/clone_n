'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getMovieById, getSimilarMovies, Movie } from '@/data/movies';
import { useMyListStore } from '@/store/myList';

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const { isInList, addToList, removeFromList } = useMyListStore();
  const [showFullDescription, setShowFullDescription] = useState(false);

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
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${movie.backdrop}')` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Back Button */}
        <button 
          className="absolute top-8 left-8 z-20 text-white hover:text-gray-300 transition-colors"
          onClick={() => router.back()}
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-16 py-8">
          <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-500 font-semibold text-lg">{movie.match}% Match</span>
            <span className="text-gray-300">{movie.year}</span>
            <span className="border border-gray-400 text-gray-300 text-sm px-2 py-0.5">{movie.rating}</span>
            {movie.duration && <span className="text-gray-300">{movie.duration}</span>}
            {movie.episodes && <span className="text-gray-300">{movie.episodes} Episodes</span>}
            <span className="text-gray-300 border border-gray-500 px-2 py-0.5 text-sm">HD</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              className="flex items-center gap-2 bg-white text-black px-10 py-3 rounded-md font-semibold text-lg hover:bg-gray-200 transition-colors"
              onClick={() => router.push('/player')}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            
            <button 
              className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-lg transition-colors ${
                isAdded 
                  ? 'bg-[#E50914] text-white' 
                  : 'bg-gray-600/70 text-white hover:bg-gray-600'
              }`}
              onClick={() => {
                if (isAdded) {
                  removeFromList(movie.id);
                } else {
                  addToList(movie);
                }
              }}
            >
              <svg className="w-6 h-6" fill={isAdded ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {isAdded ? 'Added to My List' : 'My List'}
            </button>
            
            <button className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white hover:text-white transition-colors text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-16 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <p className={`text-gray-300 text-lg leading-relaxed ${!showFullDescription && 'line-clamp-3'}`}>
                {movie.description}
              </p>
              <button 
                className="text-white mt-2 hover:underline"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Show less' : 'Read more'}
              </button>
            </div>

            {/* Cast Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Cast</h2>
              <div className="flex flex-wrap gap-4">
                {movie.cast.map((actor) => (
                  <div key={actor} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-sm">{actor.charAt(0)}</span>
                    </div>
                    <span className="text-gray-300 text-sm">{actor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <h3 className="text-gray-400 mb-4">Genres</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span key={genre} className="text-gray-300 text-sm hover:underline cursor-pointer">
                  {genre}
                </span>
              ))}
            </div>

            {movie.director && (
              <>
                <h3 className="text-gray-400 mb-4">Director</h3>
                <p className="text-gray-300 mb-6">{movie.director}</p>
              </>
            )}

            <h3 className="text-gray-400 mb-4">This title is</h3>
            <div className="flex flex-col gap-2 text-gray-300">
              <span className="hover:underline cursor-pointer">◦ Dramas</span>
              <span className="hover:underline cursor-pointer">◦ Classic Movies</span>
              <span className="hover:underline cursor-pointer">◦ Critically Acclaimed</span>
            </div>
          </div>
        </div>

        {/* Similar Titles */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similarMovies.map((simMovie) => (
              <div
                key={simMovie.id}
                className="cursor-pointer group"
                onClick={() => router.push(`/detail/${simMovie.id}`)}
              >
                <div className="w-full h-[280px] rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={simMovie.poster}
                    alt={simMovie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-white text-sm font-medium truncate">{simMovie.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-green-500">{simMovie.match}%</span>
                    <span>{simMovie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
