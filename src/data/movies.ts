// Mock data for movies and shows

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  rating: string;
  genres: string[];
  duration?: string;
  type: 'movie' | 'series';
  cast: string[];
  director?: string;
  match?: number;
  episodes?: number;
}

export interface Category {
  id: string;
  name: string;
  movies: Movie[];
}

// Profile avatars (using Unsplash)
export const profiles = [
  { id: '1', name: 'User 1', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop' },
  { id: '2', name: 'User 2', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { id: '3', name: 'User 3', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop' },
  { id: '4', name: 'User 4', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
];

// All movies database
export const allMovies: Movie[] = [
  // Action
  {
    id: '1',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    year: 2008,
    rating: 'PG-13',
    genres: ['Action', 'Crime', 'Drama'],
    duration: '2h 32min',
    type: 'movie',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan',
    match: 98,
  },
  {
    id: '2',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
    year: 2010,
    rating: 'PG-13',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    duration: '2h 28min',
    type: 'movie',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    director: 'Christopher Nolan',
    match: 97,
  },
  {
    id: '3',
    title: 'John Wick',
    description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took his car.',
    poster: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop',
    year: 2014,
    rating: 'R',
    genres: ['Action', 'Crime', 'Thriller'],
    duration: '1h 41min',
    type: 'movie',
    cast: ['Keanu Reeves', 'Michael Nyqvist', 'Alfie Allen'],
    director: 'Chad Stahelski',
    match: 95,
  },
  {
    id: '4',
    title: 'Mad Max: Fury Road',
    description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper and a drifter named Max.',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop',
    year: 2015,
    rating: 'R',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    duration: '2h',
    type: 'movie',
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'],
    director: 'George Miller',
    match: 96,
  },
  // Drama
  {
    id: '5',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&h=1080&fit=crop',
    year: 1994,
    rating: 'R',
    genres: ['Drama'],
    duration: '2h 22min',
    type: 'movie',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    director: 'Frank Darabont',
    match: 99,
  },
  {
    id: '6',
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
    year: 1972,
    rating: 'R',
    genres: ['Crime', 'Drama'],
    duration: '2h 55min',
    type: 'movie',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    director: 'Francis Ford Coppola',
    match: 98,
  },
  // Sci-Fi
  {
    id: '7',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    year: 2014,
    rating: 'PG-13',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    duration: '2h 49min',
    type: 'movie',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    match: 97,
  },
  {
    id: '8',
    title: 'Blade Runner 2049',
    description: 'Young Blade Runner Ks discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, whos been missing for thirty years.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&h=1080&fit=crop',
    year: 2017,
    rating: 'R',
    genres: ['Action', 'Drama', 'Sci-Fi'],
    duration: '2h 44min',
    type: 'movie',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
    director: 'Denis Villeneuve',
    match: 94,
  },
  // Series
  {
    id: '9',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his familys future.',
    poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    year: 2008,
    rating: 'TV-MA',
    genres: ['Crime', 'Drama', 'Thriller'],
    type: 'series',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    match: 99,
    episodes: 62,
  },
  {
    id: '10',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    poster: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop',
    year: 2016,
    rating: 'TV-14',
    genres: ['Drama', 'Fantasy', 'Horror'],
    type: 'series',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
    match: 96,
    episodes: 34,
  },
  {
    id: '11',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth IIs reign and the events that shaped the second half of the 20th century.',
    poster: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1920&h=1080&fit=crop',
    year: 2016,
    rating: 'TV-14',
    genres: ['Biography', 'Drama', 'History'],
    type: 'series',
    cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton'],
    match: 93,
    episodes: 60,
  },
  // Comedy
  {
    id: '12',
    title: 'The Grand Budapest Hotel',
    description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotels glorious years under an exceptional concierge.',
    poster: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=1080&fit=crop',
    year: 2014,
    rating: 'R',
    genres: ['Adventure', 'Comedy', 'Crime'],
    duration: '1h 39min',
    type: 'movie',
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric'],
    director: 'Wes Anderson',
    match: 91,
  },
  {
    id: '13',
    title: 'Superbad',
    description: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to score alcohol goes awry.',
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
    year: 2007,
    rating: 'R',
    genres: ['Comedy'],
    duration: '1h 53min',
    type: 'movie',
    cast: ['Jonah Hill', 'Michael Cera', 'Christopher Mintz-Plasse'],
    director: 'Greg Mottola',
    match: 88,
  },
  // Horror
  {
    id: '14',
    title: 'Get Out',
    description: 'A young African-American visits his white girlfriends parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    poster: 'https://images.unsplash.com/photo-1509248961895-40216a414a23?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=1080&fit=crop',
    year: 2017,
    rating: 'R',
    genres: ['Horror', 'Mystery', 'Thriller'],
    duration: '1h 44min',
    type: 'movie',
    cast: ['Daniel Kaluuya', 'Allison Williams', 'Bradley Whitford'],
    director: 'Jordan Peele',
    match: 92,
  },
  {
    id: '15',
    title: 'The Haunting of Hill House',
    description: 'Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.',
    poster: 'https://images.unsplash.com/photo-1509248961895-40216a414a23?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=1080&fit=crop',
    year: 2018,
    rating: 'TV-MA',
    genres: ['Drama', 'Horror', 'Mystery'],
    type: 'series',
    cast: ['Michiel Huisman', 'Carla Gugino', 'Henry Thomas'],
    match: 90,
    episodes: 10,
  },
  // Documentary
  {
    id: '16',
    title: 'Our Planet',
    description: 'Documentary series focusing on the breath-taking natural beauty and animal life found across the world.',
    poster: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop',
    year: 2019,
    rating: 'TV-G',
    genres: ['Documentary'],
    type: 'series',
    cast: ['David Attenborough'],
    match: 97,
    episodes: 8,
  },
  // Romance
  {
    id: '17',
    title: 'La La Land',
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop',
    year: 2016,
    rating: 'PG-13',
    genres: ['Comedy', 'Drama', 'Music'],
    duration: '2h 8min',
    type: 'movie',
    cast: ['Ryan Gosling', 'Emma Stone', 'John Legend'],
    director: 'Damien Chazelle',
    match: 91,
  },
  // Animation
  {
    id: '18',
    title: 'Spider-Man: Into the Spider-Verse',
    description: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
    poster: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    year: 2018,
    rating: 'PG',
    genres: ['Animation', 'Action', 'Adventure'],
    duration: '1h 57min',
    type: 'movie',
    cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld'],
    director: 'Bob Persichetti',
    match: 95,
  },
  // More variety
  {
    id: '19',
    title: 'Dune',
    description: 'A noble family becomes embroiled in a war for control over the galaxy most valuable asset while its heir becomes troubled by visions of a dark future.',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    year: 2021,
    rating: 'PG-13',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    duration: '2h 35min',
    type: 'movie',
    cast: ['Timothee Chalamet', 'Rebecca Ferguson', 'Oscar Isaac'],
    director: 'Denis Villeneuve',
    match: 96,
  },
  {
    id: '20',
    title: 'Everything Everywhere All at Once',
    description: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop',
    year: 2022,
    rating: 'R',
    genres: ['Action', 'Adventure', 'Comedy'],
    duration: '2h 19min',
    type: 'movie',
    cast: ['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan'],
    director: 'Daniel Kwan',
    match: 94,
  },
];

// Categories with their movies
export const categories: Category[] = [
  {
    id: 'trending',
    name: 'Trending Now',
    movies: allMovies.slice(0, 6),
  },
  {
    id: 'action',
    name: 'Action & Adventure',
    movies: allMovies.filter(m => m.genres.includes('Action')).slice(0, 6),
  },
  {
    id: 'drama',
    name: 'Drama',
    movies: allMovies.filter(m => m.genres.includes('Drama')).slice(0, 6),
  },
  {
    id: 'scifi',
    name: 'Sci-Fi & Fantasy',
    movies: allMovies.filter(m => m.genres.includes('Sci-Fi')).slice(0, 6),
  },
  {
    id: 'series',
    name: 'TV Shows',
    movies: allMovies.filter(m => m.type === 'series').slice(0, 6),
  },
  {
    id: 'comedy',
    name: 'Comedies',
    movies: allMovies.filter(m => m.genres.includes('Comedy')).slice(0, 6),
  },
  {
    id: 'horror',
    name: 'Horror',
    movies: allMovies.filter(m => m.genres.includes('Horror')).slice(0, 6),
  },
  {
    id: 'documentary',
    name: 'Documentaries',
    movies: allMovies.filter(m => m.genres.includes('Documentary')).slice(0, 6),
  },
  {
    id: 'animation',
    name: 'Animation',
    movies: allMovies.filter(m => m.genres.includes('Animation')).slice(0, 6),
  },
  {
    id: 'new',
    name: 'New Releases',
    movies: [...allMovies].sort((a, b) => b.year - a.year).slice(0, 6),
  },
];

// Helper functions
export const getMovieById = (id: string): Movie | undefined => {
  return allMovies.find(m => m.id === id);
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  return allMovies.filter(m => m.genres.includes(genre));
};

export const searchMovies = (query: string): Movie[] => {
  const lowerQuery = query.toLowerCase();
  return allMovies.filter(
    m =>
      m.title.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery) ||
      m.genres.some(g => g.toLowerCase().includes(lowerQuery))
  );
};

export const getSimilarMovies = (movieId: string): Movie[] => {
  const movie = getMovieById(movieId);
  if (!movie) return [];
  
  return allMovies
    .filter(m => m.id !== movieId && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 6);
};
