'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, ChevronDown, User } from 'lucide-react';
import { profiles } from '@/data/movies';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#141414]/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/browse" className="flex items-center gap-2">
            <span className="font-netflix text-4xl text-[#E50914] tracking-tight">
              NETFLIX
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/browse" className="text-white hover:text-gray-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/mylist" className="text-gray-300 hover:text-white transition-colors">
                My List
              </Link>
            </li>
            <li>
              <Link href="/search" className="text-gray-300 hover:text-white transition-colors">
                Search
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            href="/search"
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </Link>

          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#181818] border border-white/10 rounded shadow-xl">
                <div className="p-2">
                  {profiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => {
                        setCurrentProfile(profile);
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center gap-3 w-full p-2 rounded hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <span className="text-sm text-white">{profile.name}</span>
                    </button>
                  ))}
                  <hr className="my-2 border-white/10" />
                  <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-3 w-full p-2 rounded hover:bg-white/10 transition-colors text-gray-400"
                  >
                    <span className="text-sm">Sign out of Netflix</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
