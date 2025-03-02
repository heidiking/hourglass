
import React, { useEffect, useState } from 'react';
import { getQuoteForToday } from '../utils/quotes';

type Quote = {
  text: string;
  author: string;
};

const QuoteDisplay = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const loadQuote = async () => {
    try {
      const todayQuote = await getQuoteForToday();
      setQuote(todayQuote);
      setIsVisible(true);
    } catch (error) {
      console.error('Failed to load quote:', error);
      setQuote({
        text: "We perform our best when we are having fun and feeling good about ourselves.",
        author: ""
      });
      setIsVisible(true);
    }
  };

  useEffect(() => {
    loadQuote();

    // Refresh quote at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => loadQuote(), 500); // Fade out before loading new quote
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  // Listen for changes to custom quotes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'timeTrackerSettings') {
        // Reload quote when settings change (might contain new custom quote)
        setIsVisible(false);
        setTimeout(() => loadQuote(), 500);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!quote) return null;

  return (
    <div 
      className={`fixed bottom-10 left-0 right-0 text-center text-white text-shadow-sm transition-opacity duration-1000 px-4 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <p className="text-xl font-light max-w-2xl mx-auto">
        "{quote.text}"
        {quote.author && <span className="block mt-2 text-sm opacity-80">— {quote.author}</span>}
      </p>
    </div>
  );
};

export default QuoteDisplay;
