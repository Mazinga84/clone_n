'use client';

import { useRouter } from 'next/navigation';
import { useMyListStore } from '@/store/myList';

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

export default function MyListPage() {
  const router = useRouter();
  const { myList, removeFromList } = useMyListStore();

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#141414] border-b border-white/10">
        <div className="px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => router.push('/browse')}>
              <NetflixLogo />
            </button>
            <h1 className="text-white text-xl font-medium">My List</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 py-8">
        {myList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="w-20 h-20 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h2 className="text-white text-2xl mb-3">Your list is empty</h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
              Add movies and shows to your list by tapping the plus icon on any title.
            </p>
            <button 
              className="bg-[#E50914] text-white px-6 py-3 rounded font-medium hover:bg-[#f40612] transition-colors"
              onClick={() => router.push('/browse')}
            >
              Browse Movies & Shows
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-white text-xl mb-6">
              {myList.length} {myList.length === 1 ? 'Title' : 'Titles'} in Your List
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-12">
              {myList.map((movie) => (
                <div
                  key={movie.id}
                  className="relative group"
                >
                  <div 
                    className="relative w-full aspect-[2/3] rounded overflow-hidden cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() => router.push(`/detail/${movie.id}`)}
                  >
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Remove button */}
                    <button
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black hover:border-white transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromList(movie.id);
                      }}
                      aria-label="Remove from My List"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    <h3 
                      className="text-white text-sm font-medium truncate cursor-pointer hover:underline"
                      onClick={() => router.push(`/detail/${movie.id}`)}
                    >
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
          </div>
        )}
      </div>
    </div>
  );
}
