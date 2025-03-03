
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
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    author: 'Bailey Zindel',
    sourceUrl: 'https://unsplash.com/photos/NRQV-hBF10M',
    location: 'Moraine Lake, Canada',
    temperature: 15,
    weatherIcon: '🌄'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80',
    author: 'Emerald Lee',
    sourceUrl: 'https://unsplash.com/photos/Kh4tUhc7sAQ',
    location: 'Mountain Lake',
    temperature: 12,
    weatherIcon: '⛅'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?auto=format&fit=crop&w=1920&q=80',
    author: 'Luca Bravo',
    sourceUrl: 'https://unsplash.com/photos/qH36EgNjPJY',
    location: 'Dolomites, Italy',
    temperature: 18,
    weatherIcon: '☀️'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80',
    author: 'Marvin Meyer',
    sourceUrl: 'https://unsplash.com/photos/fxm90JuNPP4',
    location: 'Mountain Range',
    temperature: 20,
    weatherIcon: '🌤️'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1528184039930-bd03972bd974?auto=format&fit=crop&w=1920&q=80',
    author: 'Matthew Brodeur',
    sourceUrl: 'https://unsplash.com/photos/gXsP4AYhpKo',
    location: 'Alpine Lake',
    temperature: 16,
    weatherIcon: '🌅'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    author: 'Kalen Emsley',
    sourceUrl: 'https://unsplash.com/photos/Bkci_8qcdvQ',
    location: 'Mount Assiniboine',
    temperature: 8,
    weatherIcon: '☀️'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=1920&q=80',
    author: 'Daniel Leone',
    sourceUrl: 'https://unsplash.com/photos/g30P1zcOzXo',
    location: 'Yosemite Valley',
    temperature: 22,
    weatherIcon: '🌄'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80',
    author: 'Joshua Earle',
    sourceUrl: 'https://unsplash.com/photos/YrVdS4LWxGs',
    location: 'Mountain Peak',
    temperature: 14,
    weatherIcon: '⛅'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1920&q=80',
    author: 'Casey Horner',
    sourceUrl: 'https://unsplash.com/photos/4rDCa5hBlCs',
    location: 'Olympic Mountains',
    temperature: 19,
    weatherIcon: '☀️'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1520962922320-2038eebab146?auto=format&fit=crop&w=1920&q=80',
    author: 'Ales Krivec',
    sourceUrl: 'https://unsplash.com/photos/InvYrZliRnw',
    location: 'Julian Alps',
    temperature: 10,
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
    
    if (allBackgrounds.length === 0) {
      // Fallback if no backgrounds are available
      resolve({
        id: 999,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
        author: 'Bailey Zindel',
        sourceUrl: 'https://unsplash.com/photos/NRQV-hBF10M',
        location: 'Moraine Lake, Canada'
      });
      return;
    }
    
    // In a real app, this might fetch from an API
    // For now, we'll use the day of the month to select a background
    const today = new Date();
    const dayOfMonth = today.getDate();
    const backgroundIndex = dayOfMonth % allBackgrounds.length;
    
    // Simulate network delay
    setTimeout(() => {
      resolve(allBackgrounds[backgroundIndex]);
    }, 300);
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
  if (allBackgrounds.length === 0) return;
  
  const backgroundIndex = dayOfMonth % allBackgrounds.length;
  const nextBackground = allBackgrounds[backgroundIndex];
  
  const img = new Image();
  img.src = nextBackground.url;
};
