
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Image, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageSettingsProps {
  imageUrl: string;
  author: string;
  location: string;
  onImageUrlChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onViewArchive: () => void;
}

const ImageSettings: React.FC<ImageSettingsProps> = ({ 
  imageUrl, 
  author, 
  location,
  onImageUrlChange, 
  onAuthorChange,
  onLocationChange,
  onViewArchive
}) => {
  const [previewError, setPreviewError] = useState(false);
  
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewError(false);
    onImageUrlChange(e.target.value);
  };
  
  const handleImageError = () => {
    setPreviewError(true);
  };
  
  return (
    <div className="space-y-3 border-b pb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium text-black">Custom Background Image</h3>
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
          <Image size={16} className="text-black/70" />
          <Label htmlFor="custom-image" className="text-black/80">Your Background Image URL</Label>
        </div>
        <Input 
          id="custom-image" 
          type="text" 
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Enter image URL"
          className="bg-white border-gray-300 text-black"
        />
        <Input 
          id="custom-image-author" 
          type="text" 
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
          placeholder="Image author/photographer (optional)"
          className="bg-white border-gray-300 text-black mt-2"
        />
        <Input 
          id="custom-image-location" 
          type="text" 
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Image location (optional)"
          className="bg-white border-gray-300 text-black mt-2"
        />
        
        {imageUrl && (
          <div className="mt-2 rounded-md overflow-hidden border border-gray-300">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-full h-32 object-cover"
              onError={handleImageError}
              crossOrigin="anonymous"
            />
            {previewError && (
              <div className="bg-red-50 p-2 text-red-600 text-xs">
                Unable to load image. Please check the URL and make sure it's accessible.
              </div>
            )}
          </div>
        )}
        
        <p className="text-xs text-black/60">
          Your custom background image will be added to the rotation of backgrounds displayed on the screen.
        </p>
      </div>
    </div>
  );
};

export default React.memo(ImageSettings);
