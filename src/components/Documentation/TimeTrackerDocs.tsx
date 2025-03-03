
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, BarChart, FileText, Folder } from 'lucide-react';

const TimeTrackerDocs = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Time Tracker Documentation</h2>
      
      <div className="text-gray-700 space-y-4">
        <p>
          The Time Tracker feature automatically monitors and records the time you spend on different 
          applications and documents. It provides detailed insights about your work habits and helps 
          you understand how you allocate your time.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">How to Access the Time Tracker</h3>
        <p>
          The Time Tracker can be accessed in two ways:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Click on the <Clock className="inline h-4 w-4 text-black" /> icon in the tools panel at the bottom right of your screen
          </li>
          <li>
            If enabled, a floating <Clock className="inline h-4 w-4 text-black" /> button may appear elsewhere on your screen
          </li>
        </ul>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-4">
          <h4 className="font-medium text-blue-800">Active Tracking Indicator</h4>
          <p className="text-blue-700 mt-1">
            When the Time Tracker is actively recording your activity, the clock icon will display with a 
            green ring around it. This visual indicator helps you know that your time is being tracked.
          </p>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Time Tracker Interface</h3>
        <p>
          When you open the Time Tracker dialog, you'll see the following tabs:
        </p>
        
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="flex items-start mb-4">
              <FileText className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-lg font-medium text-black">Recent Documents</h4>
                <p className="text-gray-700">
                  Shows a chronological list of recently used documents and applications. Each entry displays:
                </p>
                <ul className="list-disc pl-5 text-gray-700 mt-2">
                  <li>Document/application name</li>
                  <li>Duration of activity</li>
                  <li>When the activity occurred</li>
                  <li>Appropriate icon based on document type</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <BarChart className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-lg font-medium text-black">Insights & Metrics</h4>
                <p className="text-gray-700">
                  Provides visualizations and statistics about your productivity:
                </p>
                <ul className="list-disc pl-5 text-gray-700 mt-2">
                  <li>Most active document and total time spent on it</li>
                  <li>Productivity metrics (hours per day)</li>
                  <li>Daily activity patterns showing your most productive hours</li>
                  <li>Weekly activity trends</li>
                  <li>Most used documents chart</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
              <div>
                <h4 className="text-lg font-medium text-black">Testing Plan</h4>
                <p className="text-gray-700">
                  Offers a structured plan for testing the Time Tracker with different applications:
                </p>
                <ul className="list-disc pl-5 text-gray-700 mt-2">
                  <li>Document applications (Word, Google Docs, etc.)</li>
                  <li>Communication tools (Email, chat applications)</li>
                  <li>Design and development environments</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h3 className="text-xl font-medium text-black mt-6">How Document Tracking Works</h3>
        <p>
          The Time Tracker automatically detects the document or application you're currently using by:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Capturing the application window title</li>
          <li>Extracting the meaningful document name from the title (removing app identifiers)</li>
          <li>Categorizing the document by type (Word document, spreadsheet, presentation, etc.)</li>
          <li>Recording start time, end time, and calculating total duration</li>
        </ol>
        
        <div className="bg-amber-50 p-4 rounded-md border border-amber-100 mt-4">
          <h4 className="font-medium text-amber-800">Important Note</h4>
          <p className="text-amber-700 mt-1">
            In this web application version, document tracking uses simulated data since browsers cannot 
            directly access system-level application information. In a desktop implementation, it would 
            track your actual application usage.
          </p>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Integrating with Projects</h3>
        <p>
          Time tracking data can be associated with specific projects:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            From the Projects manager <Folder className="inline h-4 w-4 text-black" />, you can associate tracked activities with projects
          </li>
          <li>
            This allows you to generate reports showing how much time was spent on each project
          </li>
          <li>
            For client work, you can also track earnings based on tracked time
          </li>
        </ul>
        
        <h3 className="text-xl font-medium text-black mt-6">Managing Tracking Data</h3>
        <p>
          You have control over your tracking data:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>
            <strong>Clear History:</strong> If you're not actively tracking, you can clear your entire tracking history 
            using the "Clear History" button in the Time Tracker dialog
          </li>
          <li>
            <strong>Privacy:</strong> All tracking data is stored locally in your browser and is not sent to any server
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TimeTrackerDocs;
