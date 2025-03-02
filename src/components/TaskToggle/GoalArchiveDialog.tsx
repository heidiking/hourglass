
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GoalArchive from '../GoalArchive';
import { useTaskToggle } from './TaskToggleContext';

const GoalArchiveDialog = () => {
  const { goalArchiveOpen, setGoalArchiveOpen } = useTaskToggle();

  return (
    <Dialog open={goalArchiveOpen} onOpenChange={setGoalArchiveOpen}>
      <DialogContent className="sm:max-w-md bg-black/70 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-4">Goal History</DialogTitle>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-y-auto">
          <GoalArchive showLabel={true} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoalArchiveDialog;
