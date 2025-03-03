
/**
 * documentUtils.ts
 * 
 * Utilities for working with document names and applications.
 * Provides functionality to extract meaningful information from application names
 * and categorize applications by type.
 */

/**
 * Extracts a document name from an application name where possible
 * @param {string} appName - Name of the application or full document path
 * @returns {string} Extracted document name or original app name
 */
export const extractDocumentName = (appName: string): string => {
  // Already implemented document name extraction
  if (!appName) return 'Unknown Document';
  
  // Check for common document format patterns
  const documentNamePattern = /(?:.*[/\\])?([^/\\]+\.(docx?|xlsx?|pptx?|pdf|txt|md|csv|json|html?|js|ts|jsx|tsx))$/i;
  const documentMatch = appName.match(documentNamePattern);
  
  if (documentMatch && documentMatch[1]) {
    return documentMatch[1]; // Return just the filename with extension
  }
  
  // Check for web-based document apps with document names
  const webDocPattern = /(Google Docs|Word Online|Excel Online|PowerPoint Online|Notion|Coda|Airtable|Figma|Miro)\s*(?:-|–|:|\|)?\s*(.+?)(?:\s*\||\s*-|\s*$)/i;
  const webDocMatch = appName.match(webDocPattern);
  
  if (webDocMatch && webDocMatch[2] && webDocMatch[2].trim().length > 0) {
    return `${webDocMatch[1]} - ${webDocMatch[2].trim()}`;
  }
  
  // Check for email patterns
  const emailPattern = /(Gmail|Outlook|Mail)\s*(?:-|–|:|\|)?\s*(.+?)(?:\s*\||\s*-|\s*$)/i;
  const emailMatch = appName.match(emailPattern);
  
  if (emailMatch && emailMatch[2] && emailMatch[2].trim().length > 0) {
    // Clean up email subjects that might have "Inbox -" prefixes
    const subject = emailMatch[2].trim().replace(/^(?:Inbox|Sent|Drafts)\s*(?:-|–|:|\|)?\s*/i, '');
    return `${emailMatch[1]} - ${subject}`;
  }
  
  // For browser apps, try to extract domain and page title
  const browserPattern = /(Chrome|Firefox|Safari|Edge|Opera)\s*(?:-|–|:|\|)?\s*(.+?)(?:\s*\||\s*-|\s*$)/i;
  const browserMatch = appName.match(browserPattern);
  
  if (browserMatch && browserMatch[2] && browserMatch[2].trim().length > 0) {
    return browserMatch[2].trim();
  }
  
  // Return the original app name if no patterns match
  return appName;
};

/**
 * Categorizes an application name into a general category
 * @param {string} appName - Name of the application
 * @returns {string} Category of the application
 */
export const getApplicationCategory = (appName: string): string => {
  const name = appName.toLowerCase();
  
  // Document categories
  if (name.includes("word") || name.includes(".doc") || name.includes("document")) {
    return "Word Processing";
  }
  
  if (name.includes("excel") || name.includes(".xls") || name.includes("sheet") || name.includes("spreadsheet")) {
    return "Spreadsheet";
  }
  
  if (name.includes("powerpoint") || name.includes(".ppt") || name.includes("presentation") || name.includes("slide")) {
    return "Presentation";
  }
  
  if (name.includes("pdf") || name.includes("acrobat") || name.includes("reader")) {
    return "PDF Document";
  }
  
  // Communication categories
  if (name.includes("mail") || name.includes("outlook") || name.includes("gmail") || name.includes("message")) {
    return "Email";
  }
  
  if (name.includes("slack") || name.includes("teams") || name.includes("discord") || name.includes("chat")) {
    return "Messaging";
  }
  
  if (name.includes("zoom") || name.includes("meet") || name.includes("webex") || name.includes("call")) {
    return "Video Conference";
  }
  
  // Project management
  if (name.includes("jira") || name.includes("asana") || name.includes("trello") || name.includes("notion") || 
      name.includes("monday") || name.includes("project") || name.includes("task")) {
    return "Project Management";
  }
  
  // Design tools
  if (name.includes("figma") || name.includes("sketch") || name.includes("photoshop") || 
      name.includes("illustrator") || name.includes("xd") || name.includes("design")) {
    return "Design";
  }
  
  // Development tools
  if (name.includes("vscode") || name.includes("visual studio") || name.includes("intellij") || 
      name.includes("webstorm") || name.includes("pycharm") || name.includes("code") || 
      name.includes(".js") || name.includes(".ts") || name.includes(".py") || name.includes(".java")) {
    return "Development";
  }
  
  // Browsers
  if (name.includes("chrome") || name.includes("firefox") || name.includes("safari") || 
      name.includes("edge") || name.includes("browser")) {
    return "Web Browsing";
  }
  
  return "Other Application";
};

/**
 * Suggests an icon name based on application type
 * @param {string} appName - Name of the application
 * @returns {string} Icon name suggestion
 */
export const getSuggestedIcon = (appName: string): string => {
  const category = getApplicationCategory(appName);
  
  switch(category) {
    case "Word Processing":
      return "file-text";
    case "Spreadsheet":
      return "table";
    case "Presentation":
      return "presentation";
    case "PDF Document":
      return "file";
    case "Email":
      return "mail";
    case "Messaging":
      return "message-square";
    case "Video Conference":
      return "video";
    case "Project Management":
      return "kanban";
    case "Design":
      return "palette";
    case "Development":
      return "code";
    case "Web Browsing":
      return "globe";
    default:
      return "file-text";
  }
};
