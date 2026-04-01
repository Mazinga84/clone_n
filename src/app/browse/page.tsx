'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/movies';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import CategoryRow from '@/components/CategoryRow';

export default function BrowsePage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <Hero />
      
      <div className="relative -mt-32 z-10 pb-8">
        {categories.map((category) => (
          <CategoryRow key={category.id} category={category} />
        ))}
      </div>

      <div className="h-24 bg-gradient-to-t from-[#141414] to-transparent" />
    </div>
  );
}
