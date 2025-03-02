
export type Background = {
  id: number;
  url: string;
  author?: string;
  location?: string;
};

// A collection of beautiful background images with focus on beach and ocean scenes
const backgrounds: Background[] = [
  {
    id: 1,
    url: '/lovable-uploads/322fe065-12ed-4a68-933a-d89ef8bde1c0.png',
    location: 'Tropical Island'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    location: 'Tropical Beach'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    location: 'Ocean Waves'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d',
    location: 'Beach Sunset'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    location: 'Forest Lake'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054',
    location: 'Ocean View'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    location: 'Beach Paradise'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0',
    location: 'Tropical Waters'
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
