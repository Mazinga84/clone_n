'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { profiles } from '@/data/movies';

// Netflix logo SVG - exact replica
const NetflixLogo = () => (
  <svg
    viewBox="0 0 111 30"
    className="h-9 w-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.531-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.405zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 0v21.875c5.219.02 10.438.07 15.656.125-.02-7.938-.02-15.875-.032-23.812V0H30.75zm-6.75 0v21.875c5.25.032 10.5.062 15.75.093-.022-7.781-.044-15.625-.062-23.406V0H24zM0 0h4.5v27.25c-1.593.218-3.187.406-4.5.594V0z"
      fill="#E50914"
    />
  </svg>
);

export default function ProfilesPage() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isManageMode, setIsManageMode] = useState(false);

  const handleSelectProfile = (profileId: string) => {
    if (isManageMode) return;
    setSelectedProfile(profileId);
    setTimeout(() => {
      router.push('/browse');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center p-4">
      <div className="mb-12">
        <NetflixLogo />
      </div>
      
      <h2 className="text-white text-xl md:text-2xl mb-12 font-normal tracking-wide">
        Who's watching?
      </h2>

      <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleSelectProfile(profile.id)}
          >
            <div 
              className={`w-24 h-24 md:w-28 md:h-28 rounded overflow-hidden border-2 transition-all duration-200 group-hover:border-white ${
                selectedProfile === profile.id ? 'border-[#E50914]' : 'border-transparent'
              }`}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-3 text-sm text-[#808080] group-hover:text-white transition-colors tracking-wide">
              {profile.name}
            </span>
          </div>
        ))}

        {/* Add Profile / Manage Profiles */}
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => setIsManageMode(!isManageMode)}
        >
          <div className="w-24 h-24 md:w-28 md:h-28 rounded border-2 border-[#808080] hover:border-white transition-colors flex items-center justify-center bg-[#2A2A2A] group-hover:bg-[#3A3A3A]">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 text-[#808080] group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="mt-3 text-sm text-[#808080] group-hover:text-white transition-colors tracking-wide">
            {isManageMode ? 'Done' : 'Manage Profiles'}
          </span>
        </div>
      </div>

      {/* Loading overlay */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="animate-spin w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
}
