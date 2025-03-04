
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BackToSettingsButtonProps {
  onClick: () => void;
  label?: string;
}

const BackToSettingsButton: React.FC<BackToSettingsButtonProps> = ({ 
  onClick, 
  label = "Back to Settings" 
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="absolute top-0 right-0 z-20 m-4 text-black bg-white hover:bg-white/90"
      onClick={onClick}
    >
      <X className="mr-2 h-4 w-4 text-black" />
      <span className="text-black">{label}</span>
    </Button>
  );
};

export default BackToSettingsButton;
