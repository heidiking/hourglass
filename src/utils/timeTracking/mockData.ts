
// Mock data for app tracking since we can't actually track apps without browser extensions
export const mockApps = [
  'Google Docs - Project Proposal',
  'Microsoft Word - Novel Draft Chapter 3',
  'Adobe PDF - Contract Review',
  'Google Sheets - Budget Calculations',
  'Microsoft Word - Client Brief',
  'Google Docs - Meeting Notes',
  'Microsoft Excel - Invoice Tracker',
  'Adobe PDF - Research Paper',
  'Google Docs - Article Draft',
  'Microsoft PowerPoint - Client Presentation'
];

// Mock document names for more variety
export const mockDocNames = [
  'Project Proposal.doc',
  'Novel Draft Chapter 3.docx',
  'Contract Review.pdf',
  'Budget Calculations.xlsx',
  'Client Brief.doc',
  'Meeting Notes.gdoc',
  'Invoice Tracker.xls',
  'Research Paper.pdf',
  'Article Draft.gdoc',
  'Client Presentation.pptx'
];

// Mock function to simulate detecting active app/tab
export const detectCurrentApp = (): string => {
  // In a real app, this would use browser extension APIs to detect the actual app/tab
  // For now, we randomly pick a document from our mock lists
  const randomIndex = Math.floor(Math.random() * mockApps.length);
  
  // Sometimes return the app name, sometimes the document name for variety
  return Math.random() > 0.5 ? mockApps[randomIndex] : mockDocNames[randomIndex];
};
