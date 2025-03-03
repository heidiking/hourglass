
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextQuote, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuoteSettingsProps {
  quote: string;
  author: string;
  onQuoteChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onViewArchive: () => void;
}

const QuoteSettings: React.FC<QuoteSettingsProps> = ({ 
  quote, 
  author, 
  onQuoteChange, 
  onAuthorChange,
  onViewArchive
}) => {
  return (
    <div className="space-y-3 border-b pb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium text-black">Custom Quote</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onViewArchive}
          className="text-black bg-white hover:bg-white/90"
        >
          <Archive className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">View Archive</span>
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <TextQuote size={16} className="text-black/70" />
          <Label htmlFor="custom-quote" className="text-black/80">Your Favorite Quote</Label>
        </div>
        <Input 
          id="custom-quote" 
          type="text" 
          value={quote || ''}
          onChange={(e) => onQuoteChange(e.target.value)}
          placeholder="Enter your favorite quote"
          className="bg-white border-gray-300 text-black"
        />
        <Input 
          id="custom-quote-author" 
          type="text" 
          value={author || ''}
          onChange={(e) => onAuthorChange(e.target.value)}
          placeholder="Quote author (optional)"
          className="bg-white border-gray-300 text-black mt-2"
        />
        <p className="text-xs text-black/60">
          Your custom quote will be added to the rotation of quotes displayed on the screen.
        </p>
      </div>
    </div>
  );
};

export default React.memo(QuoteSettings);
