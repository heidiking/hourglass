
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Bookmark, Clock, Shield, FileText, Settings } from 'lucide-react';
import TimeTrackerDocs from './TimeTrackerDocs';
import FocusModeDocs from './FocusModeDocs';
import ProjectsDocs from './ProjectsDocs';
import TasksDocs from './TasksDocs';
import SettingsDocs from './SettingsDocs';
import GettingStarted from './GettingStarted';

const Documentation = () => {
  const [activeTab, setActiveTab] = React.useState("getting-started");
  
  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-4">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-black">Application Documentation</DialogTitle>
        <DialogDescription className="text-gray-600">
          Learn how to use this application and all of its features
        </DialogDescription>
      </DialogHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <div className="flex flex-col space-y-2">
          <TabsList className="grid grid-cols-3 sticky top-0 bg-white z-10">
            <TabsTrigger value="getting-started" className="flex items-center justify-center">
              <Bookmark className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Getting Started</span>
            </TabsTrigger>
            <TabsTrigger value="time-tracker" className="flex items-center justify-center">
              <Clock className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Time Tracker</span>
            </TabsTrigger>
            <TabsTrigger value="focus-mode" className="flex items-center justify-center">
              <Shield className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Focus Mode</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsList className="grid grid-cols-3 sticky top-10 bg-white z-10">
            <TabsTrigger value="projects" className="flex items-center justify-center">
              <FileText className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center justify-center">
              <FileText className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center">
              <Settings className="mr-2 h-4 w-4 text-black" />
              <span className="text-black">Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="max-h-[65vh] overflow-y-auto pr-2 mt-4">
          <TabsContent value="getting-started" className="text-black">
            <GettingStarted />
          </TabsContent>
          
          <TabsContent value="time-tracker" className="text-black">
            <TimeTrackerDocs />
          </TabsContent>
          
          <TabsContent value="focus-mode" className="text-black">
            <FocusModeDocs />
          </TabsContent>
          
          <TabsContent value="projects" className="text-black">
            <ProjectsDocs />
          </TabsContent>
          
          <TabsContent value="tasks" className="text-black">
            <TasksDocs />
          </TabsContent>
          
          <TabsContent value="settings" className="text-black">
            <SettingsDocs />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Documentation;
