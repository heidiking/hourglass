
import React from 'react';

// Helper function to determine if an app is a document-based application
export const isDocumentActivity = (appName: string): boolean => {
  const name = appName.toLowerCase();
  
  // Document applications
  if (name.includes("word") || 
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
      name.includes("reader") ||
      name.includes("acrobat")) {
    return true;
  }
  
  // Email applications
  if (name.includes("mail") || 
      name.includes("outlook") || 
      name.includes("gmail") || 
      name.includes("inbox") ||
      name.includes("message") ||
      name.includes("thunderbird")) {
    return true;
  }
  
  // Calendar applications
  if (name.includes("calendar") || 
      name.includes("schedule") || 
      name.includes("appointment") ||
      name.includes("event") ||
      name.includes("ical")) {
    return true;
  }
  
  // Design applications
  if (name.includes("photoshop") || 
      name.includes("illustrator") || 
      name.includes("figma") || 
      name.includes("sketch") ||
      name.includes("canva") ||
      name.includes("design") ||
      name.includes("affinity") ||
      name.includes("indesign")) {
    return true;
  }
  
  // Development environments
  if (name.includes("vscode") || 
      name.includes("visual studio") || 
      name.includes("intellij") || 
      name.includes("xcode") ||
      name.includes("android studio") ||
      name.includes("sublime") ||
      name.includes("code editor") ||
      name.includes("github") ||
      name.includes("gitlab")) {
    return true;
  }
  
  // Project management tools
  if (name.includes("jira") || 
      name.includes("asana") || 
      name.includes("trello") || 
      name.includes("monday") ||
      name.includes("notion") ||
      name.includes("project") ||
      name.includes("task") ||
      name.includes("clickup") ||
      name.includes("todoist")) {
    return true;
  }
  
  // Communication apps
  if (name.includes("slack") ||
      name.includes("teams") ||
      name.includes("discord") ||
      name.includes("zoom") ||
      name.includes("meet") ||
      name.includes("chat")) {
    return true;
  }
  
  // Browser with specific productive sites
  if ((name.includes("chrome") || name.includes("firefox") || name.includes("safari") || name.includes("edge")) && 
      (name.includes("docs.google") || 
       name.includes("sheets.google") || 
       name.includes("github") || 
       name.includes("gitlab") || 
       name.includes("atlassian") || 
       name.includes("notion.so"))) {
    return true;
  }
  
  return false;
};

export const DocumentActivityDetector: React.FC = () => {
  return null; // This is a utility component with no UI
};
