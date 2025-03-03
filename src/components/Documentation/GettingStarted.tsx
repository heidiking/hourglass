
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Shield, Folder, FileText, Settings } from 'lucide-react';

const GettingStarted = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Getting Started with Your Productivity Suite</h2>
      <p className="text-gray-700">
        This application is designed to help you boost your productivity by tracking your activities, 
        managing projects, blocking distractions, and organizing tasks in one place.
      </p>
      
      {/* Settings Sections */}
      <h3 className="text-xl font-medium text-black mt-6">Application Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center text-black">
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm">
              Configure your background preferences, choose between light and dark themes, and set your clock format.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center text-black">
              <span>Behavior</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm">
              Configure how time tracking works and adjust focus session behaviors to suit your workflow.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center text-black">
              <span>Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm">
              Export/import your data, clear specific data categories, and manage local storage usage.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-medium text-black mt-4">Key Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center text-black">
              <Clock className="mr-2 h-5 w-5 text-blue-600" />
              <span>Time Tracker</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm">
              Track time spent on documents and applications. Get insights on your productivity patterns
              and document usage over time.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center text-black">
              <Shield className="mr-2 h-5 w-5 text-green-600" />
              <span>Focus Mode</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm">
              Block distracting websites and maintain your concentration during important work sessions.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center text-black">
              <Folder className="mr-2 h-5 w-5 text-amber-600" />
              <span>Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm">
              Organize your work into projects, associate time tracking data with specific projects, 
              and track earnings for client work.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center text-black">
              <FileText className="mr-2 h-5 w-5 text-purple-600" />
              <span>Tasks Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm">
              Create and manage tasks, set goals for your day, and track your accomplishments.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-medium text-black mt-6">How to Access Features</h3>
      <p className="text-gray-700">
        All main features can be accessed through the tool buttons panel located at the bottom right of your screen.
        Click on any icon to open its associated feature dialog.
      </p>
      
      <div className="bg-gray-100 p-4 rounded-md mt-4">
        <h4 className="text-md font-medium text-black">Quick Tips:</h4>
        <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
          <li>The Time Tracker has a green ring around it when actively tracking.</li>
          <li>You can drag and reorder icons in the tools panel to customize your workflow.</li>
          <li>Set a daily focus goal using the input field in the center of the main screen.</li>
          <li>The clock at the top always shows your current local time.</li>
        </ul>
      </div>
      
      <p className="text-gray-700 mt-4">
        To learn more about each feature, select the relevant tab in the documentation section above.
      </p>
    </div>
  );
};

export default GettingStarted;
