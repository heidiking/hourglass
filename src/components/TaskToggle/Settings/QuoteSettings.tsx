
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextQuote } from "lucide-react";

interface QuoteSettingsProps {
  quote: string;
  author: string;
  onQuoteChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
}

const QuoteSettings: React.FC<QuoteSettingsProps> = ({ 
  quote, 
  author, 
  onQuoteChange, 
  onAuthorChange 
}) => {
  return (
    <div className="space-y-3 border-b pb-4">
      <h3 className="text-md font-medium text-black">Custom Quote</h3>
      
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
