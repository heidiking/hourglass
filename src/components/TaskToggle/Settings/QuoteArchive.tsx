
import React, { useState, useEffect } from 'react';
import { X, TextQuote } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ArchivedQuote = {
  text: string;
  author: string;
  date: string;
};

const QuoteArchive = () => {
  const [archivedQuotes, setArchivedQuotes] = useState<ArchivedQuote[]>([]);
  
  useEffect(() => {
    // Load archived quotes from local storage
    const storedQuotes = localStorage.getItem('archivedQuotes');
    if (storedQuotes) {
      setArchivedQuotes(JSON.parse(storedQuotes));
    }
  }, []);

  const clearArchive = () => {
    if (confirm('Are you sure you want to clear your quote archive?')) {
      localStorage.removeItem('archivedQuotes');
      setArchivedQuotes([]);
      toast.success("Quote archive has been cleared");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-3 pb-4 border-b">
        <h2 className="text-lg font-medium text-black flex items-center">
          <TextQuote className="mr-2 h-5 w-5 text-black" />
          Quote Archive
        </h2>
        <p className="text-sm text-black/70">
          Your collection of favorite quotes
        </p>
      </div>
      
      <div className="max-h-[70vh] overflow-y-auto pr-2 py-4">
        {archivedQuotes.length > 0 ? (
          <div className="space-y-3">
            {archivedQuotes.map((quote, index) => (
              <div 
                key={index} 
                className="p-3 bg-gray-100 rounded-lg"
              >
                <p className="text-xs text-gray-500 mb-1">{quote.date}</p>
                <p className="text-sm leading-relaxed text-black">"{quote.text}"</p>
                {quote.author && (
                  <p className="text-sm text-black/70 mt-1">- {quote.author}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No archived quotes yet</p>
        )}
        
        {archivedQuotes.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={clearArchive}
              className="bg-white text-red-500 hover:bg-white/90 border border-gray-300"
            >
              <X size={16} className="mr-2 text-red-500" />
              <span className="text-red-500">Clear Archive</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteArchive;
