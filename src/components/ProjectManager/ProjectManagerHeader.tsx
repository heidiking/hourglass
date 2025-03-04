
import React from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProjectManagerHeader: React.FC = () => {
  return (
    <DialogHeader>
      <DialogTitle className="text-xl font-light mb-4 text-black">Projects & Time Tracking</DialogTitle>
    </DialogHeader>
  );
};

export default ProjectManagerHeader;
