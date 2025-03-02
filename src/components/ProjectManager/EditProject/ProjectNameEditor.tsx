
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Project } from '../types';

interface ProjectNameEditorProps {
  editingProject: Project;
  onNameChange: (name: string) => void;
  onSaveName: () => void;
}

const ProjectNameEditor: React.FC<ProjectNameEditorProps> = ({
  editingProject,
  onNameChange,
  onSaveName
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Project Name</label>
      <div className="flex items-center gap-2">
        <Input
          value={editingProject.name}
          onChange={(e) => onNameChange(e.target.value)}
          className="bg-white border-gray-300 text-black"
        />
        <Button 
          onClick={onSaveName} 
          variant="outline" 
          className="border-gray-300 whitespace-nowrap bg-white hover:bg-white/90 hover:text-black"
        >
          <span className="text-black">Save Name</span>
        </Button>
      </div>
    </div>
  );
};

export default ProjectNameEditor;
