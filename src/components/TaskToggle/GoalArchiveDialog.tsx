
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import GoalArchive from '../GoalArchive';
import { useTaskToggle } from './TaskToggleContext';

const GoalArchiveDialog = () => {
  const { goalArchiveOpen, setGoalArchiveOpen } = useTaskToggle();

  return (
    <Dialog open={goalArchiveOpen} onOpenChange={setGoalArchiveOpen}>
      <DialogContent className="sm:max-w-md bg-white text-black border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-light mb-2 text-black">Goal History</DialogTitle>
          <DialogDescription className="text-black/70">
            View and manage your completed goals
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-y-auto">
          <GoalArchive showLabel={false} className="" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoalArchiveDialog;
