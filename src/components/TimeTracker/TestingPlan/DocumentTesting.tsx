
import React from 'react';
import { FileText } from 'lucide-react';
import TestingCategory from './TestingCategory';

const DocumentTesting: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">2. Document Application Testing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TestingCategory 
          title="Word Processing" 
          icon={<FileText className="h-5 w-5 text-blue-600" />}
          applications={['Microsoft Word', 'Google Docs', 'Apple Pages']}
          testCases={[
            'Create a new document and type for 5 minutes',
            'Open an existing document and make edits',
            'Switch between multiple documents'
          ]}
        />
        
        <TestingCategory 
          title="Spreadsheets" 
          icon={<FileText className="h-5 w-5 text-green-600" />}
          applications={['Microsoft Excel', 'Google Sheets', 'Apple Numbers']}
          testCases={[
            'Work with formulas and calculations',
            'Format data in multiple worksheets',
            'Create and edit charts'
          ]}
        />
        
        <TestingCategory 
          title="Presentations" 
          icon={<FileText className="h-5 w-5 text-orange-600" />}
          applications={['Microsoft PowerPoint', 'Google Slides', 'Apple Keynote']}
          testCases={[
            'Create slides with text and images',
            'Edit an existing presentation',
            'Practice presentation mode'
          ]}
        />
        
        <TestingCategory 
          title="PDF Documents" 
          icon={<FileText className="h-5 w-5 text-red-600" />}
          applications={['Adobe Acrobat', 'Preview', 'Chrome PDF Viewer']}
          testCases={[
            'Read a PDF document for 5 minutes',
            'Add annotations or comments',
            'Fill out PDF forms'
          ]}
        />
      </div>
    </div>
  );
};

export default DocumentTesting;
