
export type Background = {
  id: number;
  url: string;
  author?: string;
  location?: string;
};

// A collection of beautiful background images
const backgrounds: Background[] = [
  {
    id: 1,
    url: '/lovable-uploads/322fe065-12ed-4a68-933a-d89ef8bde1c0.png',
    location: 'Tropical Island'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    location: 'Mountain Summit'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    location: 'Forest Lake'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
    location: 'Rocky Mountain'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    location: 'Flower Field'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    location: 'River Valley'
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
