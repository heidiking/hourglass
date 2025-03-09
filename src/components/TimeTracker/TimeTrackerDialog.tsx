
import React, { lazy, Suspense, memo, useCallback } from 'react';
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

// Lazy load components for better code-splitting
const RecentDocumentsSection = lazy(() => import('./RecentDocumentsSection'));
const TimeTrackingInsights = lazy(() => import('./TimeTrackingInsights'));
const TestingPlan = lazy(() => import('./TestingPlan'));

// Loading fallback component
const TabContentLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    <div className="h-24 bg-gray-200 rounded"></div>
    <div className="h-12 bg-gray-200 rounded w-3/4"></div>
  </div>
);

const TimeTrackerDialog = () => {
  const { 
    currentActivity,
    documentActivities,
    isTracking,
    activeTab,
    setActiveTab,
    handleClearHistory
  } = useTimeTracker();

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, [setActiveTab]);

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
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
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
                className="inline-flex ml-auto bg-white hover:bg-white/90"
                onClick={handleClearHistory}
              >
                <CircleOff className="mr-2 h-4 w-4 text-black" />
                <span className="text-black">Clear History</span>
              </Button>
            )}
          </TabsList>
          
          <TabsContent value="documents">
            <Suspense fallback={<TabContentLoader />}>
              <RecentDocumentsSection documentActivities={documentActivities} />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="insights">
            <Suspense fallback={<TabContentLoader />}>
              <TimeTrackingInsights documentActivities={documentActivities} />
            </Suspense>
          </TabsContent>
          
          <TabsContent value="testing">
            <Suspense fallback={<TabContentLoader />}>
              <TestingPlan />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default memo(TimeTrackerDialog);
