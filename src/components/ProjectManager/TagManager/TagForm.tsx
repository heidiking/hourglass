
import React from 'react';
import { Tag } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ColorPicker from '../ColorPicker';

interface TagFormProps {
  newTagName: string;
  setNewTagName: (name: string) => void;
  selectedColor: string;
  colorPickerVisible: boolean;
  setColorPickerVisible: (visible: boolean) => void;
  setSelectedColor: (color: string) => void;
  onAddTag: () => void;
}

const TagForm: React.FC<TagFormProps> = ({ 
  newTagName, 
  setNewTagName, 
  selectedColor, 
  colorPickerVisible, 
  setColorPickerVisible,
  setSelectedColor,
  onAddTag
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <Input
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="New tag"
          className="bg-white border-gray-300 text-black flex-1"
        />
        <Button 
          variant="outline" 
          className={`h-10 w-10 ${selectedColor} border-gray-300`}
          onClick={() => setColorPickerVisible(!colorPickerVisible)}
        />
        <Button 
          onClick={onAddTag} 
          variant="outline" 
          className="border-gray-300 whitespace-nowrap bg-white text-black hover:bg-white/90 hover:text-black"
        >
          <Tag size={14} className="mr-1 text-black" />
          <span className="text-black">Add Tag</span>
        </Button>
      </div>
      
      {colorPickerVisible && (
        <ColorPicker 
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          onClose={() => setColorPickerVisible(false)}
        />
      )}
    </div>
  );
};

export default TagForm;
