
import React from 'react';
import { Settings, PaintBucket, Clock, Bell, Shield } from 'lucide-react';

const SettingsDocs = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Settings Documentation</h2>
      
      <div className="text-gray-700 space-y-4">
        <p>
          The Settings panel allows you to customize the application to your preferences,
          configure features, and personalize your experience.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">How to Access Settings</h3>
        <p>
          Click on the <Settings className="inline h-4 w-4 text-black" /> icon in the tools panel at the bottom right of your screen.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">Settings Categories</h3>
        <p>
          The Settings dialog is organized into several categories:
        </p>
        
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <PaintBucket className="h-4 w-4 mr-2 text-purple-600" />
              Appearance Settings
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Customize the visual aspects of the application:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Background selection (choose from preset images or upload custom backgrounds)</li>
                <li>Dark/light mode toggle</li>
                <li>Clock format (12/24 hour)</li>
                <li>Font size and style</li>
                <li>UI layout preferences</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              Time Tracker Settings
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Configure how the Time Tracker functions:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Enable/disable automatic tracking</li>
                <li>Set minimum duration for tracked activities</li>
                <li>Configure idle detection timeout</li>
                <li>Choose which applications to exclude from tracking</li>
                <li>Set working hours for more accurate productivity metrics</li>
                <li>Configure Time Tracker button position on screen</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Shield className="h-4 w-4 mr-2 text-green-600" />
              Focus Mode Settings
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Adjust Focus Mode behaviors:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Default focus session duration</li>
                <li>Block intensity levels</li>
                <li>Schedule automatic focus sessions</li>
                <li>Configure break periods between focus sessions</li>
                <li>Set up allowed websites (exceptions to blocking)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Bell className="h-4 w-4 mr-2 text-amber-600" />
              Notifications Settings
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Manage how and when you receive notifications:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Enable/disable various notification types</li>
                <li>Set quiet hours when notifications are suppressed</li>
                <li>Configure notification sounds</li>
                <li>Set up daily summaries and reports</li>
                <li>Configure goal achievement notifications</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Customizing the Tools Panel</h3>
        <p>
          You can personalize the tools panel that appears at the bottom right of your screen:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>In the Settings dialog, find the "Tools Panel" section</li>
          <li>Drag and drop buttons to reorder them</li>
          <li>Toggle visibility for tools you don't use frequently</li>
          <li>Adjust the panel position on screen</li>
          <li>Change the appearance of the panel (compact or expanded mode)</li>
        </ol>
        
        <h3 className="text-xl font-medium text-black mt-6">Data Management Settings</h3>
        <p>
          Control your application data:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Export data (time tracking history, projects, tasks)</li>
          <li>Import data from backups</li>
          <li>Clear specific data categories</li>
          <li>Set up automatic data backups</li>
          <li>Manage local storage usage</li>
        </ul>
        <div className="bg-amber-50 p-4 rounded-md border border-amber-100 mt-4">
          <h4 className="font-medium text-amber-800">Important Note</h4>
          <p className="text-amber-700 mt-1">
            All application data is stored locally in your browser. Clearing your browser data or using the application 
            in incognito mode may result in data loss. Consider exporting your data regularly as a backup.
          </p>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Keyboard Shortcuts</h3>
        <p>
          The Settings panel includes a section for keyboard shortcuts:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>View all available shortcuts</li>
          <li>Customize shortcuts to match your preferences</li>
          <li>Enable/disable global shortcuts</li>
        </ul>
        <p className="mt-2">
          Keyboard shortcuts can significantly increase your productivity when using the application.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">Resetting to Default Settings</h3>
        <p>
          If you need to restore the original configuration:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Scroll to the bottom of the Settings dialog</li>
          <li>Look for the "Reset to Defaults" button</li>
          <li>You can choose to reset all settings or just a specific category</li>
          <li>Confirm the reset when prompted</li>
        </ol>
        <p className="mt-2">
          Note that resetting settings will not delete your data (tasks, projects, time tracking history).
        </p>
      </div>
    </div>
  );
};

export default SettingsDocs;
