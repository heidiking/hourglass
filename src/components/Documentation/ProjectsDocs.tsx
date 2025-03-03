
import React from 'react';
import { Folder, PlusCircle, Tag, Clock, DollarSign } from 'lucide-react';

const ProjectsDocs = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-black">Projects Documentation</h2>
      
      <p className="text-gray-700">
        The Projects feature organizes your work, tracks time, and monitors earnings for client work.
      </p>
      
      <h3 className="text-lg font-medium text-black">Main Features</h3>
      
      <div className="space-y-2">
        <div className="flex items-start">
          <Folder className="h-4 w-4 mr-2 text-amber-600 mt-1" />
          <div className="text-sm">
            <p className="font-medium text-black">Projects Tab</p>
            <p>Manage and view all your projects.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-4 w-4 mr-2 text-blue-600 mt-1" />
          <div className="text-sm">
            <p className="font-medium text-black">Timeline</p>
            <p>View activities by day and link them to projects.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Tag className="h-4 w-4 mr-2 text-purple-600 mt-1" />
          <div className="text-sm">
            <p className="font-medium text-black">Tags</p>
            <p>Create color-coded categories for projects.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <DollarSign className="h-4 w-4 mr-2 text-green-600 mt-1" />
          <div className="text-sm">
            <p className="font-medium text-black">Financials</p>
            <p>Track hourly rates and calculate earnings.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <PlusCircle className="h-4 w-4 mr-2 text-indigo-600 mt-1" />
          <div className="text-sm">
            <p className="font-medium text-black">Manual Entries</p>
            <p>Record offline work or activities not automatically tracked.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDocs;
