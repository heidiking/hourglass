
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useTaskToggle } from './TaskToggleContext';

const EarningsTrackerManager: React.FC = () => {
  const { earningsTrackerOpen, setEarningsTrackerOpen } = useTaskToggle();

  // For earnings tracker, we'll open ProjectManager to the earnings tab directly
  useEffect(() => {
    if (earningsTrackerOpen) {
      // Find the project manager trigger button and click it
      const projectManagerTrigger = document.getElementById('project-manager-trigger');
      if (projectManagerTrigger) {
        projectManagerTrigger.click();
        
        // Set a short timeout to allow the dialog to open before we click the projects tab
        setTimeout(() => {
          // Find and click the Projects tab to ensure we're on the right tab
          const projectsTab = document.querySelector('[data-value="projects"]');
          if (projectsTab) {
            (projectsTab as HTMLElement).click();
            
            toast.info(
              "Add earnings for each project and view your hourly rates!",
              {
                duration: 4000,
              }
            );
          }
        }, 100);
      }
      // Reset the state
      setEarningsTrackerOpen(false);
    }
  }, [earningsTrackerOpen, setEarningsTrackerOpen]);

  return null;
};

export default EarningsTrackerManager;
