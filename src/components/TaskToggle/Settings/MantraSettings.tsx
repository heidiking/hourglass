
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextQuote, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MantraSettingsProps {
  mantra: string;
  onChange: (value: string) => void;
  onViewArchive: () => void;
}

const MantraSettings: React.FC<MantraSettingsProps> = ({ mantra, onChange, onViewArchive }) => {
  return (
    <div className="space-y-3 border-b pb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium text-black">Custom Mantra</h3>
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
          <Label htmlFor="custom-mantra" className="text-black/80">Your Personal Mantra</Label>
        </div>
        <Input 
          id="custom-mantra" 
          type="text" 
          value={mantra || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your own inspiring mantra"
          className="bg-white border-gray-300 text-black"
        />
        <p className="text-xs text-black/60">
          Your personal mantra will occasionally appear in the daily rotation. Make it meaningful and inspiring!
        </p>
      </div>
    </div>
  );
};

export default React.memo(MantraSettings);
