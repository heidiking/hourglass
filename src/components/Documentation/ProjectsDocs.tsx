
import React from 'react';
import { Folder, PlusCircle, Tag, Clock, DollarSign } from 'lucide-react';

const ProjectsDocs = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Projects Documentation</h2>
      
      <div className="text-gray-700 space-y-4">
        <p>
          The Projects feature allows you to organize your work into distinct projects, associate time tracking 
          data with specific projects, and track earnings for client work. This comprehensive project management 
          system integrates with other features of the application.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">How to Access Projects</h3>
        <p>
          Click on the <Folder className="inline h-4 w-4 text-black" /> icon in the tools panel at the bottom right of your screen.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">Project Management Interface</h3>
        <p>
          The Projects dialog contains three main tabs:
        </p>
        
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Folder className="h-4 w-4 mr-2 text-amber-600" />
              Projects Tab
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Displays a grid of all your projects with summary information:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Project name</li>
                <li>Total time spent on the project</li>
                <li>Earnings (if applicable)</li>
                <li>Associated tags</li>
              </ul>
              <div className="mt-3">
                <p className="font-medium text-black">Actions available:</p>
                <ul className="list-disc pl-5 text-gray-700 mt-1">
                  <li>Click on any project to edit it</li>
                  <li>Click "New Project" to create a new project</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              Timeline Tab
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Shows a chronological timeline of all tracked activities:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Activities are grouped by day</li>
                <li>Each activity shows the document/application name and duration</li>
                <li>You can associate any activity with a project by selecting from a dropdown</li>
              </ul>
              <p className="mt-2">
                This is useful for retroactively organizing tracked time into specific projects.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <PlusCircle className="h-4 w-4 mr-2 text-green-600" />
              Edit Project Tab
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Appears when you're creating a new project or editing an existing one:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Edit the project name</li>
                <li>Manage tags associated with the project</li>
                <li>View and manage activities associated with the project</li>
                <li>Track project financials (hourly rate, total earnings)</li>
                <li>Add manual time entries for work not automatically tracked</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Creating a New Project</h3>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Open the Projects dialog</li>
          <li>Click the "New Project" button</li>
          <li>The interface will switch to the Edit Project tab</li>
          <li>Enter a name for your project</li>
          <li>Set up any tags or financial information</li>
          <li>Click "Save Project" when you're done</li>
        </ol>
        
        <h3 className="text-xl font-medium text-black mt-6">Managing Project Tags</h3>
        <div className="flex items-start mt-2">
          <Tag className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
          <div>
            <p className="text-gray-700">
              Tags help you categorize and filter projects:
            </p>
            <ol className="list-decimal pl-5 text-gray-700 mt-2">
              <li>While editing a project, click "Manage Tags"</li>
              <li>Enter a tag name and select a color</li>
              <li>Click "Add Tag" to create the tag</li>
              <li>Existing tags can be clicked to associate them with the current project</li>
              <li>Tags can be deleted if no longer needed</li>
            </ol>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Tracking Project Financials</h3>
        <div className="flex items-start mt-2">
          <DollarSign className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
          <div>
            <p className="text-gray-700">
              For client work or billable projects:
            </p>
            <ol className="list-decimal pl-5 text-gray-700 mt-2">
              <li>While editing a project, look for the "Project Financials" section</li>
              <li>Enter your hourly rate</li>
              <li>The system will automatically calculate earnings based on tracked time</li>
              <li>You can manually adjust the final amount if needed</li>
            </ol>
            <p className="mt-2">
              This feature is particularly useful for freelancers and consultants who bill by the hour.
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Adding Manual Time Entries</h3>
        <p>
          For work that wasn't automatically tracked:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>While editing a project, look for the "Manual Time Entry" section</li>
          <li>Enter a description of the activity</li>
          <li>Set the date when the activity occurred</li>
          <li>Enter the start and end times</li>
          <li>Click "Add Time Entry" to record it</li>
        </ol>
        <p className="mt-2">
          This is useful for recording offline work, meetings, or activities done on devices where tracking wasn't available.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">Tips for Effective Project Management</h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Create separate projects for each client or major initiative</li>
          <li>Use tags to categorize projects (e.g., "Client", "Personal", "Research")</li>
          <li>Regularly review the timeline to ensure activities are assigned to the correct projects</li>
          <li>Use manual time entries to fill in any gaps in your tracking</li>
          <li>Review project metrics periodically to identify opportunities for improved efficiency</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsDocs;
