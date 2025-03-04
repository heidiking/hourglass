
import React, { useState, useEffect } from 'react';
import { X, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addCustomBackground, removeCustomBackground } from '../../../utils/backgrounds';

type ArchivedImage = {
  id: number;
  url: string;
  author?: string;
  location?: string;
  date: string;
};

const ImageArchive = () => {
  const [archivedImages, setArchivedImages] = useState<ArchivedImage[]>([]);
  
  useEffect(() => {
    // Load archived images from local storage
    const storedImages = localStorage.getItem('archivedImages');
    if (storedImages) {
      setArchivedImages(JSON.parse(storedImages));
    }
  }, []);

  const clearArchive = () => {
    if (confirm('Are you sure you want to clear your image archive?')) {
      // Remove each custom background from the backgrounds utility
      archivedImages.forEach(image => {
        if (image.id) {
          removeCustomBackground(image.id);
        }
      });
      
      localStorage.removeItem('archivedImages');
      setArchivedImages([]);
      toast.success("Image archive has been cleared");
    }
  };

  const handleRemoveImage = (id: number) => {
    // Remove from archived images
    const newArchivedImages = archivedImages.filter(image => image.id !== id);
    setArchivedImages(newArchivedImages);
    localStorage.setItem('archivedImages', JSON.stringify(newArchivedImages));
    
    // Remove from backgrounds utility
    removeCustomBackground(id);
    
    toast.success("Image removed from archive");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-3 pb-4 border-b">
        <h2 className="text-lg font-medium text-black flex items-center">
          <Image className="mr-2 h-5 w-5 text-black" />
          Background Image Archive
        </h2>
        <p className="text-sm text-black/70">
          Your collection of custom background images
        </p>
      </div>
      
      <div className="max-h-[70vh] overflow-y-auto pr-2 py-4">
        {archivedImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archivedImages.map((image) => (
              <div 
                key={image.id} 
                className="p-3 bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-gray-500">{image.date}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveImage(image.id)}
                    className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                  >
                    <X size={14} />
                  </Button>
                </div>
                <div className="h-32 mb-2 rounded overflow-hidden bg-black/10">
                  <img 
                    src={image.url} 
                    alt="Background" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x150?text=Invalid+Image';
                    }}
                  />
                </div>
                {(image.author || image.location) && (
                  <div className="text-sm text-black/70">
                    {image.author && <p>{image.author}</p>}
                    {image.location && <p>{image.location}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No archived images yet</p>
        )}
        
        {archivedImages.length > 0 && (
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

export default ImageArchive;
