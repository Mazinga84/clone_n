'use client';

import { useRouter } from 'next/navigation';
import { useMyListStore } from '@/store/myList';

export default function MyListPage() {
  const router = useRouter();
  const { myList, removeFromList } = useMyListStore();

  return (
    <div className="min-h-screen bg-[#141414] pt-24 px-16">
      <h1 className="text-3xl font-bold text-white mb-8">My List</h1>
      
      {myList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="w-24 h-24 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-2xl text-white mb-4">Your list is empty</h2>
          <p className="text-gray-400 mb-8">Start adding movies and shows to your list by clicking the + icon.</p>
          <button 
            className="bg-[#E50914] text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
            onClick={() => router.push('/browse')}
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {myList.map((movie) => (
            <div
              key={movie.id}
              className="relative group cursor-pointer"
            >
              <div 
                className="w-full h-[300px] rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105"
                onClick={() => router.push(`/detail/${movie.id}`)}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-3">
                <div className="flex items-start justify-between">
                  <h3 
                    className="text-white font-medium truncate cursor-pointer hover:underline"
                    onClick={() => router.push(`/detail/${movie.id}`)}
                  >
                    {movie.title}
                  </h3>
                  <button
                    className="text-gray-400 hover:text-white transition-colors ml-2"
                    onClick={() => removeFromList(movie.id)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <span className="text-green-500">{movie.match}%</span>
                  <span>{movie.year}</span>
                  <span className="border border-gray-500 text-xs px-1">{movie.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
