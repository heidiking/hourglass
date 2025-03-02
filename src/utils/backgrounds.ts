
export type Background = {
  id: number;
  url: string;
  author?: string;
  location?: string;
  temperature?: number; // Temperature in Celsius
  weatherIcon?: string; // Icon identifier
};

// A collection of beautiful background images with location and weather data
const backgrounds: Background[] = [
  {
    id: 1,
    url: '/lovable-uploads/322fe065-12ed-4a68-933a-d89ef8bde1c0.png',
    location: 'Tropical Island',
    temperature: 28,
    weatherIcon: '☀️'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    location: 'Mountain Summit',
    temperature: 12,
    weatherIcon: '⛅'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    location: 'Tropical Beach',
    temperature: 31,
    weatherIcon: '☀️'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1535569235968-b95ee25500e5',
    location: 'Ocean Waves',
    temperature: 24,
    weatherIcon: '🌤️'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    location: 'Beach Sunset',
    temperature: 25,
    weatherIcon: '🌅'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1484821582734-6692f7b94bf4',
    location: 'Turquoise Ocean',
    temperature: 29,
    weatherIcon: '☀️'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0',
    location: 'Calm Sea',
    temperature: 27,
    weatherIcon: '🌤️'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7',
    location: 'Beach Waves',
    temperature: 26,
    weatherIcon: '⛅'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc8',
    location: 'Tropical Paradise',
    temperature: 30,
    weatherIcon: '☀️'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1566024287286-457247b70310',
    location: 'Ocean View',
    temperature: 23,
    weatherIcon: '🌤️'
  }
];

// Function to get a background based on the current date
export const getBackgroundForToday = async (): Promise<Background> => {
  return new Promise((resolve) => {
    // In a real app, this might fetch from an API
    // For now, we'll use the day of the month to select a background
    const today = new Date();
    const dayOfMonth = today.getDate();
    const backgroundIndex = dayOfMonth % backgrounds.length;
    
    // Simulate network delay
    setTimeout(() => {
      resolve(backgrounds[backgroundIndex]);
    }, 500);
  });
};

// Function to preload the next day's background (could be called at night)
export const preloadNextBackground = (): void => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayOfMonth = tomorrow.getDate();
  const backgroundIndex = dayOfMonth % backgrounds.length;
  const nextBackground = backgrounds[backgroundIndex];
  
  const img = new Image();
  img.src = nextBackground.url;
};
