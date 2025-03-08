
export type Background = {
  id: number;
  url: string;
  author?: string;
  sourceUrl?: string;
  location?: string;
  temperature?: number; // Temperature in Celsius
  weatherIcon?: string; // Icon identifier
  isCustom?: boolean;
  title?: string; // For artwork title
  year?: string; // For artwork year
  type?: 'landscape' | 'painting'; // Categorize the background
};

// A collection of beautiful background images with location and weather data
const landscapes: Background[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    author: 'Bailey Zindel',
    sourceUrl: 'https://unsplash.com/photos/NRQV-hBF10M',
    location: 'Moraine Lake, Canada',
    temperature: 15,
    weatherIcon: '🌄',
    type: 'landscape'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80',
    author: 'Emerald Lee',
    sourceUrl: 'https://unsplash.com/photos/Kh4tUhc7sAQ',
    location: 'Mountain Lake',
    temperature: 12,
    weatherIcon: '⛅',
    type: 'landscape'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?auto=format&fit=crop&w=1920&q=80',
    author: 'Luca Bravo',
    sourceUrl: 'https://unsplash.com/photos/qH36EgNjPJY',
    location: 'Dolomites, Italy',
    temperature: 18,
    weatherIcon: '☀️',
    type: 'landscape'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80',
    author: 'Marvin Meyer',
    sourceUrl: 'https://unsplash.com/photos/fxm90JuNPP4',
    location: 'Mountain Range',
    temperature: 20,
    weatherIcon: '🌤️',
    type: 'landscape'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1528184039930-bd03972bd974?auto=format&fit=crop&w=1920&q=80',
    author: 'Matthew Brodeur',
    sourceUrl: 'https://unsplash.com/photos/gXsP4AYhpKo',
    location: 'Alpine Lake',
    temperature: 16,
    weatherIcon: '🌅',
    type: 'landscape'
  }
];

// Add fine art paintings that are in the public domain
const paintings: Background[] = [
  {
    id: 101,
    url: 'https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGQxOS0wNzA3ODEuanBn.jpg',
    author: 'Claude Monet',
    title: 'Water Lilies',
    year: '1906',
    type: 'painting',
    sourceUrl: 'https://www.rawpixel.com/image/537852/water-lilies'
  },
  {
    id: 102,
    url: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcGQtNS1wZDUtMjM2LXRlZGR5LWpwZy1pbWFnZS5qcGc.jpg',
    author: 'Vincent van Gogh',
    title: 'Starry Night',
    year: '1889',
    type: 'painting',
    sourceUrl: 'https://www.rawpixel.com/image/2042503/starry-night-vincent-van-gogh'
  },
  {
    id: 103,
    url: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGQyMC0yMDMuanBn.jpg',
    author: 'Katsushika Hokusai',
    title: 'The Great Wave off Kanagawa',
    year: '1831',
    type: 'painting',
    sourceUrl: 'https://www.rawpixel.com/image/511533/great-wave-kanagawa'
  },
  {
    id: 104,
    url: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGQxOS0wNzI0OTYtam9iNjA4LWEuanBn.jpg',
    author: 'Gustav Klimt',
    title: 'The Kiss',
    year: '1908',
    type: 'painting',
    sourceUrl: 'https://www.rawpixel.com/image/2682447/the-kiss'
  },
  {
    id: 105,
    url: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHgxMDg2MDU3LWltYWdlLWt3dnk2ZXl2LmpwZw.jpg',
    author: 'Johannes Vermeer',
    title: 'Girl with a Pearl Earring',
    year: '1665',
    type: 'painting',
    sourceUrl: 'https://www.rawpixel.com/image/601383/girl-pearl-earring'
  }
];

// Combine all backgrounds
const backgrounds: Background[] = [...landscapes, ...paintings];

// Function to get custom backgrounds from localStorage
const getCustomBackgrounds = (): Background[] => {
  try {
    const customBgs = localStorage.getItem('customBackgrounds');
    if (customBgs) {
      const parsed = JSON.parse(customBgs);
      // Validate that we have an array of backgrounds with valid URLs
      if (Array.isArray(parsed)) {
        return parsed.filter(bg => bg && typeof bg.url === 'string' && bg.url.trim() !== '');
      }
    }
  } catch (e) {
    console.error('Error loading custom backgrounds:', e);
  }
  return [];
};

// Function to get a background based on the current date
export const getBackgroundForToday = async (): Promise<Background> => {
  return new Promise((resolve, reject) => {
    try {
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
          location: 'Moraine Lake, Canada',
          type: 'landscape'
        });
        return;
      }
      
      // In a real app, this might fetch from an API
      // For now, we'll use the day of the month to select a background
      const today = new Date();
      const dayOfMonth = today.getDate();
      const backgroundIndex = dayOfMonth % allBackgrounds.length;
      
      // Validate the selected background before returning it
      const selectedBackground = allBackgrounds[backgroundIndex];
      
      // Ensure the URL is valid
      if (!selectedBackground || !selectedBackground.url || typeof selectedBackground.url !== 'string') {
        // If invalid, fallback to the first default background
        console.error('Invalid background selected, using fallback');
        resolve(backgrounds[0] || {
          id: 999,
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
          author: 'Bailey Zindel',
          sourceUrl: 'https://unsplash.com/photos/NRQV-hBF10M',
          location: 'Moraine Lake, Canada',
          type: 'landscape'
        });
        return;
      }
      
      // Simulate network delay
      setTimeout(() => {
        resolve(selectedBackground);
      }, 300);
    } catch (error) {
      console.error('Error in getBackgroundForToday:', error);
      // Fallback on error
      resolve({
        id: 999,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
        author: 'Bailey Zindel',
        sourceUrl: 'https://unsplash.com/photos/NRQV-hBF10M',
        location: 'Moraine Lake, Canada',
        type: 'landscape'
      });
    }
  });
};

// Function to add a custom background
export const addCustomBackground = (imageUrl: string, author?: string, location?: string, title?: string, year?: string, type: 'landscape' | 'painting' = 'landscape'): void => {
  const customBackgrounds = getCustomBackgrounds();
  
  const newBackground: Background = {
    id: Date.now(), // Use timestamp as unique ID
    url: imageUrl,
    author,
    location,
    title,
    year,
    type,
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
