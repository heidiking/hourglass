
import React, { useEffect, useState } from 'react';
import { getBackgroundForToday } from '../utils/backgrounds';

const BackgroundManager = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBackground = async () => {
      setIsLoading(true);
      try {
        const todayBackground = await getBackgroundForToday();
        setBgImage(todayBackground.url);
      } catch (error) {
        console.error('Failed to load background:', error);
        // Fallback to a default image
        setBgImage('/lovable-uploads/322fe065-12ed-4a68-933a-d89ef8bde1c0.png');
      } finally {
        setIsLoading(false);
      }
    };

    loadBackground();

    // Refresh background at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      loadBackground();
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black z-[-2] animate-pulse-soft" />
      )}
      {bgImage && (
        <img
          src={bgImage}
          alt="Daily background"
          className={`bg-image ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
        />
      )}
      <div className="fixed inset-0 bg-black/20 z-[-1]" aria-hidden="true" />
    </>
  );
};

export default BackgroundManager;
