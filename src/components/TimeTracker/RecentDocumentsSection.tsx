
import React, { memo, useMemo, useState } from 'react';
import { FileText, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivitySession } from '@/utils/timeTracking/types';
import ActivityItem from './ActivityItem';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface RecentDocumentsSectionProps {
  documentActivities: ActivitySession[];
}

const ITEMS_PER_PAGE = 5; // Number of dates to show per page

const RecentDocumentsSection: React.FC<RecentDocumentsSectionProps> = ({ documentActivities }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Group activities by date
  const groupedActivities = useMemo(() => {
    return documentActivities.reduce((acc, activity) => {
      const date = new Date(activity.startTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {} as {[key: string]: ActivitySession[]});
  }, [documentActivities]);

  // Sort dates in descending order (newest first)
  const sortedDates = useMemo(() => {
    return Object.keys(groupedActivities).sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    );
  }, [groupedActivities]);
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedDates.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleDates = sortedDates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2 flex items-center text-black">
        <FileText size={16} className="mr-2 text-black" />
        Recent Documents
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-2 text-black hover:text-gray-700">
                <Info size={14} className="text-black" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-white text-black border border-gray-300">
              <p className="max-w-xs">In this web demo, document names are simulated. A real implementation would require a browser extension or desktop app.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      
      {documentActivities.length > 0 ? (
        <div className="space-y-4">
          {visibleDates.map(date => (
            <div key={date} className="space-y-2">
              <h4 className="text-sm font-medium bg-black/10 p-2 rounded text-black">{date}</h4>
              <div className="space-y-2">
                {groupedActivities[date].map((activity, index) => 
                  <ActivityItem key={`${activity.id}-${index}`} activity={activity} />
                )}
              </div>
            </div>
          ))}
          
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevPage} 
                disabled={currentPage === 0}
                className="bg-white"
              >
                <ChevronLeft size={16} className="text-black mr-1" />
                <span className="text-black">Previous</span>
              </Button>
              <span className="text-sm text-black">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages - 1}
                className="bg-white"
              >
                <span className="text-black">Next</span>
                <ChevronRight size={16} className="text-black ml-1" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 bg-black/10 rounded-md text-black">
          No document activity recorded yet
        </div>
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(RecentDocumentsSection);
