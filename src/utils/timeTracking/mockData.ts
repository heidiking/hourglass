
// Mock data for app tracking since we can't actually track apps without browser extensions
export const mockApps = [
  'Google Docs', 'Google Sheets', 'Google Slides', 'Google Drive',
  'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Microsoft Outlook',
  'Apple Pages', 'Apple Numbers', 'Apple Keynote', 'Apple Notes',
  'Adobe Acrobat Reader', 'Adobe Photoshop', 'Adobe Illustrator',
  'Notion', 'Slack', 'Zoom', 'VSCode', 'Figma'
];

// Mock document names for more variety
export const mockDocNames = [
  'Project Proposal.gdoc', 'Marketing Plan.gdoc', 'Meeting Notes.gdoc',
  'Budget Calculations.gsheet', 'Presentation.gslide',
  'Client Contract.docx', 'Financial Report.xlsx', 'Team Presentation.pptx',
  'Research Paper.pages', 'Product Roadmap.numbers', 'Company Overview.key',
  'Design Guidelines.pdf', 'Technical Specifications.pdf',
  'Project Timeline.notion', 'Team Discussion.slack'
];

// Mock function to simulate detecting active app/tab
export const detectCurrentApp = (): string => {
  // In a real app, this would use browser extension APIs to detect the actual app/tab
  // For now, we randomly pick a document from our mock lists
  const randomIndex = Math.floor(Math.random() * mockApps.length);
  const randomDocIndex = Math.floor(Math.random() * mockDocNames.length);
  
  // Choose between returning just the app name, or app with document name for variety
  const returnType = Math.random();
  if (returnType < 0.33) {
    return mockApps[randomIndex];
  } else if (returnType < 0.66) {
    return mockDocNames[randomDocIndex];
  } else {
    return `${mockApps[randomIndex]} - ${mockDocNames[randomDocIndex]}`;
  }
};
