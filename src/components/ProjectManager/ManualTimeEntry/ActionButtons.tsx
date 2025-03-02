
import React from 'react';
import { Plus, Save, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ManualActivity } from '../types';

interface ActionButtonsProps {
  editingActivity: ManualActivity | null;
  addManualActivity: () => void;
  cancelEditing: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  editingActivity,
  addManualActivity,
  cancelEditing
}) => {
  if (editingActivity) {
    return (
      <div className="flex gap-2 pt-2">
        <Button 
          onClick={addManualActivity}
          variant="outline" 
          className="border-gray-300 flex-1 bg-white text-black hover:bg-white/90 hover:text-black"
        >
          <Save size={14} className="mr-1" />
          <span className="text-black">Save Changes</span>
        </Button>
        <Button 
          onClick={cancelEditing}
          variant="outline" 
          className="border-gray-300 bg-white text-black hover:bg-white/90 hover:text-black"
        >
          <X size={14} className="mr-1" />
          <span className="text-black">Cancel</span>
        </Button>
      </div>
    );
  }
  
  return (
    <Button 
      onClick={addManualActivity} 
      variant="outline" 
      className="border-gray-300 w-full bg-white text-black hover:bg-white/90 hover:text-black mt-2"
    >
      <Plus size={14} className="mr-1" />
      <span className="text-black">Add Time Entry</span>
    </Button>
  );
};

export default ActionButtons;
