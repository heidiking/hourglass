
export type Background = {
  id: number;
  url: string;
  author?: string;
  sourceUrl?: string;
  location?: string;
  temperature?: number; // Temperature in Celsius
  weatherIcon?: string; // Icon identifier
  isCustom?: boolean;
};

// A collection of beautiful background images with location and weather data
const backgrounds: Background[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80',
    author: 'Robert Lukeman',
    sourceUrl: 'https://unsplash.com/photos/silhouette-of-trees-during-golden-hour-_RBcxo9AU-U',
    location: 'Forest Sunset',
    temperature: 22,
    weatherIcon: '🌄'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
    author: 'Vincent Guth',
    sourceUrl: 'https://unsplash.com/photos/silhouette-photography-of-mountains-during-sunset-uEcSKKDB1pg',
    location: 'Mountain Summit',
    temperature: 12,
    weatherIcon: '⛅'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    author: 'Sean O.',
    sourceUrl: 'https://unsplash.com/photos/seashore-during-golden-hour-_RBcxo9AU-U',
    location: 'Tropical Beach',
    temperature: 31,
    weatherIcon: '☀️'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1535569235968-b95ee25500e5?auto=format&fit=crop&w=1920&q=80',
    author: 'Corey Young',
    sourceUrl: 'https://unsplash.com/photos/blue-body-of-water-T9-G96sXHuM',
    location: 'Ocean Waves',
    temperature: 24,
    weatherIcon: '🌤️'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1920&q=80',
    author: 'Sean O.',
    sourceUrl: 'https://unsplash.com/photos/people-walking-on-beach-during-sunset-AZMmUy2qL6A',
    location: 'Beach Sunset',
    temperature: 25,
    weatherIcon: '🌅'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1484821582734-6692f7b94bf4?auto=format&fit=crop&w=1920&q=80',
    author: 'Jeremy Bishop',
    sourceUrl: 'https://unsplash.com/photos/person-swimming-on-body-of-water-EwKXn5CapA4',
    location: 'Turquoise Ocean',
    temperature: 29,
    weatherIcon: '☀️'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1433477155337-9aea4e790195?auto=format&fit=crop&w=1920&q=80',
    author: 'Ash Edmonds',
    sourceUrl: 'https://unsplash.com/photos/green-mountain-JmR_qkX_T_8',
    location: 'Mountain Valley',
    temperature: 16,
    weatherIcon: '🌄'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1920&q=80',
    author: 'Omer Salom',
    sourceUrl: 'https://unsplash.com/photos/ocean-waves-during-golden-hour-1eTgH9Zfocs',
    location: 'Beach Waves',
    temperature: 26,
    weatherIcon: '⛅'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?auto=format&fit=crop&w=1920&q=80',
    author: 'Ishan @seefromthesky',
    sourceUrl: 'https://unsplash.com/photos/aerial-view-photography-of-island-surrounded-by-body-of-water-hqCEQTc4gZA',
    location: 'Tropical Paradise',
    temperature: 30,
    weatherIcon: '☀️'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1920&q=80',
    author: 'Wil Stewart',
    sourceUrl: 'https://unsplash.com/photos/silhouette-photography-of-trees-during-golden-hour-UErWoQEoMrc',
    location: 'Sunset Forest',
    temperature: 18,
    weatherIcon: '🌄'
  }
];

// Function to get custom backgrounds from localStorage
const getCustomBackgrounds = (): Background[] => {
  try {
    const customBgs = localStorage.getItem('customBackgrounds');
    if (customBgs) {
      return JSON.parse(customBgs);
    }
  } catch (e) {
    console.error('Error loading custom backgrounds:', e);
  }
  return [];
};

// Function to get a background based on the current date
export const getBackgroundForToday = async (): Promise<Background> => {
  return new Promise((resolve) => {
    // First check if we have any custom backgrounds
    const customBackgrounds = getCustomBackgrounds();
    const allBackgrounds = [...backgrounds, ...customBackgrounds];
    
    // In a real app, this might fetch from an API
    // For now, we'll use the day of the month to select a background
    const today = new Date();
    const dayOfMonth = today.getDate();
    const backgroundIndex = dayOfMonth % allBackgrounds.length;
    
    // Simulate network delay
    setTimeout(() => {
      resolve(allBackgrounds[backgroundIndex]);
    }, 500);
  });
};

// Function to add a custom background
export const addCustomBackground = (imageUrl: string, author?: string, location?: string): void => {
  const customBackgrounds = getCustomBackgrounds();
  
  const newBackground: Background = {
    id: Date.now(), // Use timestamp as unique ID
    url: imageUrl,
    author,
    location,
    isCustom: true
  };
  
  customBackgrounds.push(newBackground);
  localStorage.setItem('customBackgrounds', JSON.stringify(customBackgrounds));
};

// Function to remove a custom background
export const removeCustomBackground = (id: number): void => {
  let customBackgrounds = getCustomBackgrounds();
  customBackgrounds = customBackgrounds.filter(bg => bg.id !== id);
  localStorage.setItem('customBackgrounds', JSON.stringify(customBackgrounds));
};

// Function to get all backgrounds (both default and custom)
export const getAllBackgrounds = (): Background[] => {
  const customBackgrounds = getCustomBackgrounds();
  return [...backgrounds, ...customBackgrounds];
};

// Function to preload the next day's background (could be called at night)
export const preloadNextBackground = (): void => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayOfMonth = tomorrow.getDate();
  
  const allBackgrounds = [...backgrounds, ...getCustomBackgrounds()];
  const backgroundIndex = dayOfMonth % allBackgrounds.length;
  const nextBackground = allBackgrounds[backgroundIndex];
  
  const img = new Image();
  img.src = nextBackground.url;
};
