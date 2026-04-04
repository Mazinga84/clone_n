'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Bell, ChevronDown, User } from 'lucide-react';
import { profiles } from '@/data/movies';

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

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#141414]' : 'bg-transparent'
      }`}
    >
      <div className="px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/browse" className="flex items-center">
            <NetflixLogo />
          </Link>

          <div className="hidden lg:flex">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link href="/browse" className="text-white hover:text-gray-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-300 hover:text-white transition-colors">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-300 hover:text-white transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-300 hover:text-white transition-colors">
                  New & Popular
                </Link>
              </li>
              <li>
                <Link href="/mylist" className="text-gray-300 hover:text-white transition-colors">
                  My List
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-300 hover:text-white transition-colors">
                  Browse by Languages
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link 
            href="/search"
            className="p-2 hover:bg-white/10 rounded transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Link>

          <button 
            className="p-2 hover:bg-white/10 rounded transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors"
            >
              <img
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="w-7 h-7 rounded object-cover"
              />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#181818] border border-white/10 rounded shadow-2xl">
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
                        className="w-7 h-7 rounded object-cover"
                      />
                      <span className="text-sm text-white">{profile.name}</span>
                    </button>
                  ))}
                  <div className="border-t border-white/10 my-2" />
                  <Link
                    href="/"
                    className="flex items-center gap-3 p-2 rounded hover:bg-white/10 transition-colors"
                  >
                    <div className="w-7 h-7 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">Settings</span>
                  </Link>
                  <div className="border-t border-white/10 my-2" />
                  <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-3 w-full p-2 rounded hover:bg-white/10 transition-colors"
                  >
                    <div className="w-7 h-7 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">Sign out of Clone N</span>
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
