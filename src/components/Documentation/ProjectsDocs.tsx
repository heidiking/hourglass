
import React from 'react';
import { Folder, PlusCircle, Tag, Clock, DollarSign } from 'lucide-react';

const ProjectsDocs = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-black">Projects Documentation</h2>
      
      <div className="text-gray-700 space-y-3">
        <p>
          The Projects feature organizes your work, associates time tracking data with specific projects, 
          and tracks earnings for client work.
        </p>
        
        <h3 className="text-lg font-medium text-black mt-4">Access & Interface</h3>
        <p>
          Click the <Folder className="inline h-4 w-4 text-black" /> icon in the bottom right tools panel.
          The interface has three main tabs:
        </p>
        
        <div className="mt-2 space-y-2">
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Folder className="h-4 w-4 mr-2 text-amber-600" />
              Projects Tab
            </h4>
            <div className="ml-5 mt-1 text-sm">
              <p>Displays all your projects with summary information.</p>
              <div className="mt-2">
                <p className="font-medium text-black">Actions:</p>
                <ul className="list-disc pl-5 text-gray-700 mt-1">
                  <li>Enter a project name and click "Add Project"</li>
                  <li>Click any project to edit details</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              Timeline Tab
            </h4>
            <div className="ml-5 mt-1 text-sm">
              <p>Shows chronological timeline of tracked activities grouped by day.</p>
              <p className="mt-1">You can associate any activity with a project using the dropdown menu.</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <PlusCircle className="h-4 w-4 mr-2 text-green-600" />
              Edit Project Tab
            </h4>
            <div className="ml-5 mt-1 text-sm">
              <ul className="list-disc pl-5 text-gray-700">
                <li>Edit project name</li>
                <li>Manage tags</li>
                <li>Associate activities</li>
                <li>Track financials</li>
                <li>Add manual time entries</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-black mt-4">Key Features</h3>
        
        <div className="flex items-start mt-2">
          <Tag className="h-4 w-4 mr-2 text-purple-600 mt-1" />
          <div className="text-sm">
            <p className="font-medium text-black">Tags</p>
            <p>Create color-coded tags to categorize projects by client, type, or priority.</p>
          </div>
        </div>
        
        <div className="flex items-start mt-2">
          <DollarSign className="h-4 w-4 mr-2 text-green-600 mt-1" />
          <div className="text-sm">
            <p className="font-medium text-black">Project Financials</p>
            <p>Track hourly rates and automatically calculate earnings based on time spent.</p>
          </div>
        </div>
        
        <div className="flex items-start mt-2">
          <Clock className="h-4 w-4 mr-2 text-blue-600 mt-1" />
          <div className="text-sm">
            <p className="font-medium text-black">Manual Time Entries</p>
            <p>Record offline work or activities not automatically tracked.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDocs;
