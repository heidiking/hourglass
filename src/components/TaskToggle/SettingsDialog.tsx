
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Documentation from '../Documentation';

interface SettingsDialogProps {
  // No props required
}

const SettingsDialog: React.FC<SettingsDialogProps> = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [showDocumentation, setShowDocumentation] = useState(false);
  
  if (showDocumentation) {
    return <Documentation />;
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <DialogHeader className="flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <DialogTitle className="text-lg text-black">Settings</DialogTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-black bg-white hover:bg-white/90"
          onClick={() => setShowDocumentation(true)}
        >
          <Info className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">View Documentation</span>
        </Button>
      </DialogHeader>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="appearance" className="text-black">Appearance</TabsTrigger>
          <TabsTrigger value="behavior" className="text-black">Behavior</TabsTrigger>
          <TabsTrigger value="data" className="text-black">Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-4">
          {/* Appearance settings content would go here */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Background Settings</h3>
            <p className="text-gray-700">Configure your background preferences</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Theme Settings</h3>
            <p className="text-gray-700">Choose between light and dark themes</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Clock Format</h3>
            <p className="text-gray-700">Configure how time is displayed</p>
          </div>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-4">
          {/* Behavior settings content would go here */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Notification Settings</h3>
            <p className="text-gray-700">Configure app notifications</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Time Tracker Settings</h3>
            <p className="text-gray-700">Configure how time tracking works</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Focus Mode Settings</h3>
            <p className="text-gray-700">Configure focus session behavior</p>
          </div>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          {/* Data settings content would go here */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Data Export/Import</h3>
            <p className="text-gray-700">Backup and restore your data</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Clear Data</h3>
            <p className="text-gray-700">Reset specific data categories</p>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-black">Storage Management</h3>
            <p className="text-gray-700">Manage local storage usage</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsDialog;
