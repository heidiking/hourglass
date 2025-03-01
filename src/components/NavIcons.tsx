
import React, { useState } from 'react';
import { Link2, Activity, Search, Settings, Sun } from 'lucide-react';
import { toast } from "sonner";
import GoalArchive from './GoalArchive';
import TimeTracker from './TimeTracker';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const NavItem = ({ icon, label, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-2 text-white hover:text-white/80 transition-colors"
      aria-label={label}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-light">{label}</span>
    </button>
  );
};

const NavIcons = () => {
  return (
    <div className="fixed top-0 left-0 p-4 flex gap-6 z-10">
      <TimeTracker />
      <NavItem 
        icon={<Link2 size={20} />} 
        label="Links" 
        onClick={() => toast('Links feature coming soon!')} 
      />
      <NavItem 
        icon={<Activity size={20} />} 
        label="Focus" 
        onClick={() => document.getElementById('focus-dialog-trigger')?.click()} 
      />
      <GoalArchive />
      <NavItem 
        icon={<Search size={20} />} 
        label="Search" 
        onClick={() => toast('Search feature coming soon!')} 
      />
    </div>
  );
};

const Weather = () => {
  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4 text-white z-10">
      <div className="flex items-center">
        <Sun size={20} className="mr-2" />
        <span className="text-3xl font-light">75°</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm">Focused Today</span>
        <span className="text-sm">Jacksonville Beach</span>
      </div>
    </div>
  );
};

export { NavIcons, Weather };
