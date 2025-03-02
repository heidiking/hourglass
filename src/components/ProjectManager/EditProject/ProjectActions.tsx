
import React from 'react';
import { Copy, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProjectActionsProps {
  onBack: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({
  onBack,
  onDuplicate,
  onDelete
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gray-300 bg-white text-black hover:bg-white/90 hover:text-black"
          onClick={onBack}
        >
          <span className="text-black">Back</span>
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-300 bg-white text-black hover:bg-white/90 hover:text-black"
          onClick={onDuplicate}
        >
          <Copy size={14} className="mr-1" />
          <span className="text-black">Duplicate</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-300 bg-white text-red-500 hover:bg-white/90 hover:text-red-500"
          onClick={onDelete}
        >
          <Trash size={14} className="mr-1" />
          <span className="text-red-500">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default ProjectActions;
