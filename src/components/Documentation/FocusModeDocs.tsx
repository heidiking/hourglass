
import React from 'react';
import { Shield, ListX, Plus, Settings } from 'lucide-react';

const FocusModeDocs = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Focus Mode Documentation</h2>
      
      <div className="text-gray-700 space-y-4">
        <p>
          Focus Mode helps you maintain concentration by blocking distracting websites during work sessions.
          This feature allows you to stay on task and improve productivity by eliminating common digital interruptions.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">How to Access Focus Mode</h3>
        <p>
          Click on the <Shield className="inline h-4 w-4 text-black" /> icon in the tools panel at the bottom right of your screen.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">Setting Up Focus Mode</h3>
        <p>
          Before you can start a focus session, you need to configure which websites to block:
        </p>
        
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="font-medium flex items-center text-black">
            <ListX className="h-4 w-4 mr-2 text-red-500" />
            Managing Blocked Sites
          </h4>
          <div className="ml-6 mt-2">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open the Focus Mode dialog</li>
              <li>Use the input field to add URLs of distracting websites (e.g., facebook.com)</li>
              <li>Click "Add" to add the site to your block list</li>
              <li>You can remove sites from the list by clicking the delete button next to each entry</li>
            </ol>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="font-medium flex items-center text-black">
            <Plus className="h-4 w-4 mr-2 text-blue-500" />
            Quick Add Common Sites
          </h4>
          <div className="ml-6 mt-2">
            <p>
              Focus Mode offers a quick way to add commonly distracting websites:
            </p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>Click on any of the preset site categories (Social Media, News, Entertainment)</li>
              <li>Select specific sites from each category to add to your block list</li>
              <li>This allows you to quickly build a comprehensive block list</li>
            </ol>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Starting a Focus Session</h3>
        <p>
          Once you've configured your block list:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Click the "Start Focus Mode" button at the bottom of the dialog</li>
          <li>Focus Mode will activate and begin blocking the specified websites</li>
          <li>A timer will start, showing how long you've been in focus mode</li>
        </ol>
        
        <div className="bg-green-50 p-4 rounded-md border border-green-100 mt-4">
          <h4 className="font-medium text-green-800">Active Focus Session</h4>
          <p className="text-green-700 mt-1">
            During an active focus session:
          </p>
          <ul className="list-disc pl-5 text-green-700 mt-2">
            <li>The Focus Mode dialog will display the elapsed time</li>
            <li>Attempts to visit blocked sites will be prevented</li>
            <li>You can click "End Focus Mode" at any time to stop the session</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Focus Mode Settings</h3>
        <div className="flex items-start mt-2">
          <Settings className="h-5 w-5 mr-3 text-gray-600 mt-0.5" />
          <div>
            <p className="text-gray-700">
              Access advanced settings by clicking the "Settings" button in the Focus Mode dialog:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mt-2">
              <li>
                <strong>Working Hours:</strong> Define your typical working hours to schedule focus sessions
              </li>
              <li>
                <strong>Block Intensity:</strong> Adjust how strictly websites are blocked
              </li>
              <li>
                <strong>Notifications:</strong> Configure focus-related notifications
              </li>
              <li>
                <strong>Exceptions:</strong> Set up allowed websites even during focus mode
              </li>
            </ul>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Tips for Effective Focus Sessions</h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Start with shorter focus sessions (25-30 minutes) and gradually increase duration</li>
          <li>Take short breaks between focus sessions to maintain productivity</li>
          <li>Use Focus Mode in combination with the Time Tracker to analyze your productivity patterns</li>
          <li>Regularly update your block list based on new distractions you discover</li>
          <li>Consider blocking mobile apps on your phone during important focus sessions</li>
        </ul>
      </div>
    </div>
  );
};

export default FocusModeDocs;
