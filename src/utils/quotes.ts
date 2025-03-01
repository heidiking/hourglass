
export type Quote = {
  text: string;
  author: string;
};

// Collection of inspirational quotes
const quotes: Quote[] = [
  {
    text: "We perform our best when we are having fun and feeling good about ourselves.",
    author: "Anonymous"
  },
  {
    text: "Follow your passion.",
    author: ""
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer"
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    text: "Quality is not an act, it is a habit.",
    author: "Aristotle"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  }
];

// Function to get a quote based on the current date
export const getQuoteForToday = async (): Promise<Quote> => {
  return new Promise((resolve) => {
    // In a real app, this might fetch from an API
    // For now, we'll use the day of the month to select a quote
    const today = new Date();
    const dayOfMonth = today.getDate();
    const quoteIndex = dayOfMonth % quotes.length;
    
    // Simulate network delay
    setTimeout(() => {
      resolve(quotes[quoteIndex]);
    }, 800);
  });
};
