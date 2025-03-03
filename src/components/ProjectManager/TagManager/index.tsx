
import React from 'react';
import { Project, ProjectTag } from '../types';
import TagForm from './TagForm';
import TagList from './TagList';

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
      <label className="text-sm text-gray-700">Tags</label>
      <TagForm
        newTagName={newTagName}
        setNewTagName={setNewTagName}
        selectedColor={selectedColor}
        colorPickerVisible={colorPickerVisible}
        setColorPickerVisible={setColorPickerVisible}
        setSelectedColor={setSelectedColor}
        onAddTag={addTag}
      />
      
      <TagList
        tags={editingProject.tags}
        onRemoveTag={removeTag}
      />
    </div>
  );
};

export default TagManager;
