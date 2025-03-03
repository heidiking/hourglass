
import React, { memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleOff, Clock, FileText, BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTimeTracker } from './TimeTrackerContext';
import CurrentActivitySection from './CurrentActivitySection';
import RecentDocumentsSection from './RecentDocumentsSection';
import TimeTrackingInsights from './TimeTrackingInsights';
import TestingPlan from './TestingPlan';

const TimeTrackerDialog = () => {
  const { 
    currentActivity,
    documentActivities,
    isTracking,
    activeTab,
    setActiveTab,
    handleClearHistory
  } = useTimeTracker();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center text-lg text-black">
          <Clock className="mr-2 h-5 w-5 text-black" />
          Document Time Tracker
        </DialogTitle>
        <DialogDescription className="text-gray-700">
          Track time spent on documents and applications
        </DialogDescription>
      </DialogHeader>
      
      {currentActivity && (
        <CurrentActivitySection currentActivity={currentActivity} />
      )}
      
      <div className="mt-4">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="documents" className="flex items-center justify-center">
              <FileText className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Recent Documents</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center justify-center">
              <BarChart className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Insights & Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center justify-center">
              <Clock className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Testing Plan</span>
            </TabsTrigger>
            {!isTracking && (
              <Button 
                variant="outline" 
                size="sm" 
                className="inline-flex ml-auto bg-white text-black"
                onClick={handleClearHistory}
              >
                <CircleOff className="mr-2 h-4 w-4 text-black" />
                <span className="text-black">Clear History</span>
              </Button>
            )}
          </TabsList>
          
          <TabsContent value="documents">
            <RecentDocumentsSection documentActivities={documentActivities} />
          </TabsContent>
          
          <TabsContent value="insights">
            <TimeTrackingInsights documentActivities={documentActivities} />
          </TabsContent>
          
          <TabsContent value="testing">
            <TestingPlan />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(TimeTrackerDialog);
