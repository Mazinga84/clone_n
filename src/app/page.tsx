'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { profiles } from '@/data/movies';

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
      <h1 className="font-netflix text-5xl text-[#E50914] mb-16 tracking-wider">
        NETFLIX
      </h1>
      
      <h2 className="text-white text-2xl mb-12 font-normal">
        Who's watching?
      </h2>

      <div className="flex gap-8 flex-wrap justify-center">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleSelectProfile(profile.id)}
          >
            <div 
              className={`w-32 h-32 rounded-md overflow-hidden border-4 transition-all duration-200 group-hover:border-white ${
                selectedProfile === profile.id ? 'border-[#E50914]' : 'border-transparent'
              }`}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-4 text-[#808080] group-hover:text-white transition-colors">
              {profile.name}
            </span>
          </div>
        ))}

        {/* Add Profile */}
        <div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => setIsManageMode(!isManageMode)}
        >
          <div className="w-32 h-32 rounded-md border-4 border-[#808080] hover:border-white transition-colors flex items-center justify-center bg-[#2A2A2A]">
            <svg
              className="w-16 h-16 text-[#808080] group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="mt-4 text-[#808080] group-hover:text-white transition-colors">
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
