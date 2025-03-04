
import React from 'react';
import { Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewProjectFormProps {
  newProjectName: string;
  setNewProjectName: (name: string) => void;
  handleCreateNewProject: () => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ 
  newProjectName, 
  setNewProjectName, 
  handleCreateNewProject 
}) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Input
        placeholder="New project name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
        className="flex-1 bg-white border-gray-300 text-black"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCreateNewProject();
          }
        }}
      />
      <Button 
        onClick={handleCreateNewProject}
        className="bg-white hover:bg-white/90 text-black border border-gray-300"
      >
        <Plus size={18} className="mr-2 text-black" />
        <span className="text-black">Add Project</span>
      </Button>
    </div>
  );
};

export default NewProjectForm;
