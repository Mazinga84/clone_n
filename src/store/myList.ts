// Zustand store for My List with localStorage persistence
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/data/movies';

interface MyListStore {
  myList: Movie[];
  addToList: (movie: Movie) => void;
  removeFromList: (movieId: string) => void;
  isInList: (movieId: string) => boolean;
}

export const useMyListStore = create<MyListStore>()(
  persist(
    (set, get) => ({
      myList: [],
      
      addToList: (movie: Movie) => {
        const { myList } = get();
        if (!myList.find((m) => m.id === movie.id)) {
          set({ myList: [...myList, movie] });
        }
      },
      
      removeFromList: (movieId: string) => {
        const { myList } = get();
        set({ myList: myList.filter((m) => m.id !== movieId) });
      },
      
      isInList: (movieId: string) => {
        return get().myList.some((m) => m.id === movieId);
      },
    }),
    {
      name: 'clonen-mylist',
    }
  )
);
