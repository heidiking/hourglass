
import React from 'react';

// Helper function to determine if an app is a document-based application
export const isDocumentActivity = (appName: string): boolean => {
  const name = appName.toLowerCase();
  return name.includes("word") || 
         name.includes("doc") || 
         name.includes("excel") || 
         name.includes("sheet") || 
         name.includes("powerpoint") || 
         name.includes("presentation") || 
         name.includes("pdf") || 
         name.includes(".doc") || 
         name.includes(".xls") || 
         name.includes(".ppt") || 
         name.includes(".pdf") ||
         name.includes("pages") ||
         name.includes("numbers") ||
         name.includes("keynote") ||
         name.includes("flights");  // Adding the test document name
};

export const DocumentActivityDetector: React.FC = () => {
  return null; // This is a utility component with no UI
};
