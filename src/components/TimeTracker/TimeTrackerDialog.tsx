
import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTimeTracker } from './TimeTrackerContext';
import CurrentActivitySection from './CurrentActivitySection';
import RecentDocumentsSection from './RecentDocumentsSection';
import TimeTrackingInsights from './TimeTrackingInsights';

const TimeTrackerDialog: React.FC = () => {
  const { 
    dialogOpen, 
    handleOpenChange, 
    activeTab, 
    setActiveTab, 
    documentActivities,
    currentActivity,
    handleClearHistory
  } = useTimeTracker();

  return (
    <DialogContent 
      className="sm:max-w-[550px] bg-white text-black border-gray-200"
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle className="flex items-center text-lg font-medium text-black">
          <Clock size={18} className="mr-2" />
          Document Time Tracker
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Track your time spent on documents and applications
        </DialogDescription>
      </DialogHeader>
      
      <CurrentActivitySection currentActivity={currentActivity} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid grid-cols-2 mb-2">
          <TabsTrigger value="documents" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">
            Recent Documents
          </TabsTrigger>
          <TabsTrigger value="insights" className="bg-white text-black data-[state=active]:bg-gray-100 data-[state=active]:text-black">
            Insights & Metrics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="max-h-[50vh] overflow-y-auto px-1">
          <RecentDocumentsSection documentActivities={documentActivities} />
        </TabsContent>
        
        <TabsContent value="insights" className="max-h-[50vh] overflow-y-auto px-1">
          <TimeTrackingInsights documentActivities={documentActivities} />
        </TabsContent>
      </Tabs>
      
      <DialogFooter className="mt-4">
        <Button 
          onClick={handleClearHistory} 
          variant="outline"
          className="bg-white hover:bg-white/90 border-gray-300"
          aria-label="Clear history"
        >
          <Trash2 className="mr-2 text-black" size={16} />
          <span className="text-black">Clear Document History</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TimeTrackerDialog;
