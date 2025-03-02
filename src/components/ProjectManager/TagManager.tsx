
import React from 'react';
import { Tag, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project, ProjectTag } from './types';
import ColorPicker from './ColorPicker';

interface TagManagerProps {
  editingProject: Project;
  onUpdateProject: (updatedProject: Project) => void;
}

const TagManager: React.FC<TagManagerProps> = ({ 
  editingProject, 
  onUpdateProject 
}) => {
  const [newTagName, setNewTagName] = React.useState<string>('');
  const [colorPickerVisible, setColorPickerVisible] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState("bg-blue-500");

  const addTag = () => {
    if (!editingProject || !newTagName.trim()) return;
    
    const newTag: ProjectTag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      color: selectedColor,
    };
    
    const updatedProject = {
      ...editingProject,
      tags: [...editingProject.tags, newTag],
    };
    
    onUpdateProject(updatedProject);
    setNewTagName('');
    setColorPickerVisible(false);
  };

  const removeTag = (tagId: string) => {
    const updatedProject = {
      ...editingProject,
      tags: editingProject.tags.filter(tag => tag.id !== tagId),
    };
    
    onUpdateProject(updatedProject);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-white/70">Tags</label>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <Input
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="New tag"
            className="bg-black/30 border-gray-700 text-white flex-1"
          />
          <Button 
            variant="outline" 
            className={`h-10 w-10 ${selectedColor} border-gray-700`}
            onClick={() => setColorPickerVisible(!colorPickerVisible)}
          />
          <Button onClick={addTag} variant="outline" className="border-gray-700 whitespace-nowrap bg-white text-black hover:bg-white/90 hover:text-black">
            <Tag size={14} className="mr-1 text-black" />
            Add Tag
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
      
      {editingProject.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {editingProject.tags.map(tag => (
            <Badge 
              key={tag.id}
              className={`${tag.color} text-white flex items-center gap-1 px-2 py-1`}
            >
              {tag.name}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => removeTag(tag.id)}
              />
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/60">No tags yet</p>
      )}
    </div>
  );
};

export default TagManager;
