
/**
 * mockData.ts
 * 
 * Provides simulated application data for the time tracking system.
 * Used in the web version where real system monitoring is not possible.
 */

// Document apps with realistic document names
const documentApps = [
  "Microsoft Word - 2023 Annual Report.docx",
  "Microsoft Word - Project Proposal Draft.docx",
  "Microsoft Word - Meeting Minutes 2023-05-15.docx",
  "Microsoft Word - Client Contract ACME Corp.docx",
  "Microsoft Word - Team Structure Document.docx",
  "Google Docs - Marketing Strategy 2023.gdoc",
  "Google Docs - Interview Questions.gdoc",
  "Google Docs - Product Roadmap Q3.gdoc",
  "Google Docs - Feature Requirements.gdoc",
  "Apple Pages - Resume John Smith.pages",
  "Apple Pages - Product Brochure.pages",
  "PDF Reader - Financial Statements FY2023.pdf",
  "PDF Reader - Research Paper AI Applications.pdf",
  "PDF Reader - Technical Documentation v2.1.pdf",
  "Adobe Acrobat - Contract Revision 3.pdf",
  "Notepad - code_notes.txt",
  "Notepad - server_config.txt",
  "Notepad - meeting_agenda.txt"
];

// Spreadsheet apps
const spreadsheetApps = [
  "Microsoft Excel - 2023 Budget Forecast.xlsx",
  "Microsoft Excel - Sales Data Analysis.xlsx",
  "Microsoft Excel - Inventory Tracking Q2.xlsx",
  "Microsoft Excel - Project Timeline.xlsx",
  "Microsoft Excel - Employee Schedule.xlsx",
  "Google Sheets - Expense Report March.gsheet",
  "Google Sheets - Team OKRs.gsheet",
  "Google Sheets - Product Metrics Dashboard.gsheet",
  "Google Sheets - Content Calendar.gsheet",
  "Apple Numbers - Sales Projections.numbers",
  "Apple Numbers - Customer Survey Results.numbers",
  "Tableau - Regional Sales Dashboard",
  "Power BI - Customer Insights Report"
];

// Presentation apps
const presentationApps = [
  "Microsoft PowerPoint - Quarterly Business Review.pptx",
  "Microsoft PowerPoint - Product Launch Presentation.pptx",
  "Microsoft PowerPoint - Investor Pitch Deck.pptx",
  "Microsoft PowerPoint - Training Materials.pptx",
  "Microsoft PowerPoint - Conference Presentation.pptx",
  "Google Slides - Company All-Hands.gslide",
  "Google Slides - Project Status Update.gslide",
  "Google Slides - Marketing Campaign Overview.gslide",
  "Google Slides - Team Introduction.gslide",
  "Apple Keynote - Design Concepts.key",
  "Apple Keynote - Sales Proposal.key",
  "Prezi - Interactive Demo"
];

// Email apps
const emailApps = [
  "Outlook - Project Timeline Update",
  "Outlook - Meeting Invitation: Weekly Sync",
  "Outlook - RE: Budget Approval",
  "Outlook - FWD: Client Feedback",
  "Outlook - New Product Feature Discussion",
  "Gmail - Interview Scheduling",
  "Gmail - Quarterly Report Results",
  "Gmail - Team Lunch Planning",
  "Gmail - RE: Document Review Request",
  "Gmail - Action Items from Yesterday's Meeting",
  "Apple Mail - Contract Revision",
  "Apple Mail - Conference Registration",
  "Thunderbird - Support Ticket #4528"
];

// Communication apps
const communicationApps = [
  "Slack - #product-team",
  "Slack - #general",
  "Slack - Direct Message: Sarah Johnson",
  "Slack - #engineering",
  "Microsoft Teams - Marketing Team",
  "Microsoft Teams - Project Alpha",
  "Microsoft Teams - Meeting: Design Review",
  "Microsoft Teams - Chat with Alex",
  "Zoom - Weekly Status Call",
  "Zoom - Client Presentation",
  "Zoom - Team Brainstorming Session",
  "Google Meet - Interview: Frontend Developer",
  "Google Meet - Board Meeting",
  "Discord - Design Community",
  "WhatsApp Web - Project Group Chat"
];

// Design apps
const designApps = [
  "Figma - Website Redesign",
  "Figma - Mobile App UI",
  "Figma - Brand Style Guide",
  "Figma - Dashboard Components",
  "Adobe Photoshop - Product Banner Design",
  "Adobe Photoshop - Image Editing for Website",
  "Adobe Illustrator - Logo Update",
  "Adobe Illustrator - Marketing Materials",
  "Sketch - iOS App Interface",
  "Sketch - UI Component Library",
  "Adobe XD - Prototype for Client Review",
  "Adobe XD - User Flow Diagrams",
  "Canva - Social Media Graphics",
  "Canva - Presentation Template"
];

// Development apps
const developmentApps = [
  "VS Code - frontend-project/App.tsx",
  "VS Code - backend-api/controllers/users.js",
  "VS Code - utils/data-processing.ts",
  "VS Code - tests/integration/auth.test.js",
  "VS Code - database/migrations/20230510.sql",
  "IntelliJ IDEA - src/main/java/com/app/Controller.java",
  "IntelliJ IDEA - build.gradle",
  "WebStorm - components/Dashboard/index.js",
  "WebStorm - services/api.js",
  "Android Studio - MainActivity.java",
  "Android Studio - layout/activity_main.xml",
  "Xcode - ViewController.swift",
  "Xcode - AppDelegate.swift",
  "PyCharm - data_analysis.py",
  "PyCharm - api_client.py",
  "Sublime Text - config.json",
  "Terminal - Running dev server"
];

// Browser apps
const browserApps = [
  "Chrome - Google Calendar",
  "Chrome - Jira | Project Board",
  "Chrome - GitHub: Pull Request Review",
  "Chrome - Stack Overflow: React Hooks Question",
  "Chrome - AWS Console: S3 Buckets",
  "Chrome - Confluence: Project Documentation",
  "Chrome - LinkedIn: Messages",
  "Chrome - YouTube: React Tutorial",
  "Chrome - Google Drive: Shared Documents",
  "Firefox - Asana: Task Management",
  "Firefox - Medium: Article on System Design",
  "Firefox - ChatGPT: Code Assistance",
  "Firefox - Trello: Sprint Planning Board",
  "Safari - Apple Developer Documentation",
  "Safari - Hacker News",
  "Edge - Microsoft 365 Admin",
  "Edge - Power BI Dashboard"
];

// Project management apps
const projectApps = [
  "Jira - Backend Task Board",
  "Jira - Sprint Planning",
  "Jira - Bug Tracking",
  "Asana - Marketing Campaign Tasks",
  "Asana - Product Launch Timeline",
  "Trello - Personal Tasks",
  "Trello - Content Calendar",
  "Monday.com - Resource Allocation",
  "Monday.com - Client Projects",
  "Notion - Company Wiki",
  "Notion - Meeting Notes Database",
  "Notion - Project Documentation",
  "ClickUp - Development Roadmap",
  "Airtable - Product Catalog",
  "Airtable - Customer Database"
];

// All apps combined
const allApps = [
  ...documentApps,
  ...spreadsheetApps,
  ...presentationApps,
  ...emailApps,
  ...communicationApps,
  ...designApps,
  ...developmentApps,
  ...browserApps,
  ...projectApps
];

/**
 * Simulates detecting the current active application
 * This is used in the web version where actual OS detection is not possible
 * @returns {string} Name of the simulated active application
 */
export const detectCurrentApp = (): string => {
  // Randomly select an application name to simulate switching between apps
  return allApps[Math.floor(Math.random() * allApps.length)];
};

/**
 * Gets a list of recently used applications for the simulation
 * @param {number} count - Number of apps to return
 * @returns {string[]} Array of app names
 */
export const getRecentApps = (count: number = 10): string[] => {
  const apps = [...allApps];
  const result = [];
  
  // Shuffle and pick the requested number of apps
  for (let i = 0; i < count && apps.length > 0; i++) {
    const index = Math.floor(Math.random() * apps.length);
    result.push(apps[index]);
    apps.splice(index, 1);
  }
  
  return result;
};

/**
 * Gets apps of a specific category for the simulation
 * @param {string} category - Category of apps to return
 * @param {number} count - Number of apps to return
 * @returns {string[]} Array of app names
 */
export const getAppsByCategory = (category: string, count: number = 5): string[] => {
  let categoryApps: string[] = [];
  
  switch(category.toLowerCase()) {
    case 'document':
    case 'documents':
    case 'word':
      categoryApps = [...documentApps];
      break;
    case 'spreadsheet':
    case 'spreadsheets':
    case 'excel':
      categoryApps = [...spreadsheetApps];
      break;
    case 'presentation':
    case 'presentations':
    case 'powerpoint':
      categoryApps = [...presentationApps];
      break;
    case 'email':
    case 'mail':
      categoryApps = [...emailApps];
      break;
    case 'communication':
    case 'chat':
    case 'messaging':
      categoryApps = [...communicationApps];
      break;
    case 'design':
    case 'graphics':
      categoryApps = [...designApps];
      break;
    case 'development':
    case 'coding':
    case 'programming':
      categoryApps = [...developmentApps];
      break;
    case 'browser':
    case 'web':
      categoryApps = [...browserApps];
      break;
    case 'project':
    case 'management':
      categoryApps = [...projectApps];
      break;
    default:
      categoryApps = [...allApps];
      break;
  }
  
  // Shuffle and return the requested number
  const result = [];
  const shuffled = [...categoryApps];
  
  for (let i = 0; i < count && shuffled.length > 0; i++) {
    const index = Math.floor(Math.random() * shuffled.length);
    result.push(shuffled[index]);
    shuffled.splice(index, 1);
  }
  
  return result;
};
