
/**
 * documentUtils.ts
 * 
 * Utilities for processing document and application names.
 * Contains functions to extract meaningful document titles from application window titles.
 */

/**
 * Extracts a clean document name from an application window title
 * by removing application names and file extensions
 * 
 * @param {string} appName - The full application window title
 * @returns {string} - Clean document name
 */
export const extractDocumentName = (appName: string): string => {
  // Early validation to prevent regex errors
  if (!appName || typeof appName !== 'string') {
    console.warn('Invalid app name provided to extractDocumentName');
    return 'Unknown Document';
  }
  
  // Define pattern matching rules for various applications
  const documentPatterns = [
    // Microsoft Word patterns
    { regex: /^(.*?)(?:\.docx?)?(?:\s*-\s*(?:Microsoft\s*)?Word|\.docx?)$/i, group: 1, app: 'Word' },
    { regex: /^Microsoft Word - (.*?)(?:\.docx?)?$/i, group: 1, app: 'Word' },
    { regex: /^(.*?) - Word$/i, group: 1, app: 'Word' },
    
    // Google Docs patterns
    { regex: /^(.*?)(?: \(.*\))?\s*-\s*Google\s*Docs/i, group: 1, app: 'Google Docs' },
    { regex: /^Google Docs - (.*?)$/i, group: 1, app: 'Google Docs' },
    
    // Microsoft Excel patterns
    { regex: /^(.*?)(?:\s*\.xlsx?)?\s*-\s*(?:Microsoft\s*)?Excel/i, group: 1, app: 'Excel' },
    
    // Microsoft PowerPoint patterns
    { regex: /^(.*?)(?:\s*\.pptx?)?\s*-\s*(?:Microsoft\s*)?PowerPoint/i, group: 1, app: 'PowerPoint' },
    
    // PDF viewers
    { regex: /^(.*?)(?:\.pdf)?\s*-\s*(?:Adobe|PDF)/i, group: 1, app: 'PDF' },
    
    // Email clients
    { regex: /^(.*?)\s*-\s*(?:Mail|Gmail|Outlook)/i, group: 1, app: 'Email' },
    { regex: /^(?:(?:Mail|Gmail|Outlook)\s*-\s*)(.*?)$/i, group: 1, app: 'Email' },
    
    // Calendar
    { regex: /^(.*?)\s*-\s*(?:Calendar|iCal)/i, group: 1, app: 'Calendar' },
    { regex: /^(?:Calendar|iCal)\s*-\s*(.*?)$/i, group: 1, app: 'Calendar' },
    
    // Design apps
    { regex: /^(.*?)\s*-\s*(?:Photoshop|Illustrator|Figma|Sketch)/i, group: 1, app: 'Design' },
    
    // Development environments
    { regex: /^(.*?)\s*-\s*(?:VSCode|Visual Studio|IntelliJ|Xcode)/i, group: 1, app: 'Development' },
    
    // Project management
    { regex: /^(.*?)\s*-\s*(?:Jira|Asana|Trello|Monday|Notion)/i, group: 1, app: 'Project Management' },
    
    // Generic pattern (last resort)
    { regex: /^(.*?)\s*-\s*.*/, group: 1, app: 'Generic' }
  ];
  
  // Try each pattern until we find a match
  for (const pattern of documentPatterns) {
    try {
      const match = appName.match(pattern.regex);
      if (match && match[pattern.group]) {
        return match[pattern.group].trim();
      }
    } catch (error) {
      console.error(`Error matching pattern for ${pattern.app}:`, error);
      // Continue to next pattern
    }
  }
  
  // Return original if no patterns matched
  return appName;
};

/**
 * Maps an application name to a category for better organization
 * 
 * @param {string} appName - The application name
 * @returns {string} - Category name
 */
export const getApplicationCategory = (appName: string): string => {
  const name = appName.toLowerCase();
  
  // Document applications
  if (name.includes("word") || name.includes("doc") || name.includes(".doc") || name.includes("pages")) {
    return "Word Processing";
  }
  
  if (name.includes("excel") || name.includes("sheet") || name.includes(".xls") || name.includes("numbers")) {
    return "Spreadsheets";
  }
  
  if (name.includes("powerpoint") || name.includes("presentation") || name.includes(".ppt") || name.includes("keynote")) {
    return "Presentations";
  }
  
  if (name.includes("pdf") || name.includes(".pdf")) {
    return "PDF Documents";
  }
  
  // Email applications
  if (name.includes("mail") || name.includes("outlook") || name.includes("gmail")) {
    return "Email";
  }
  
  // Calendar applications
  if (name.includes("calendar") || name.includes("schedule") || name.includes("appointment")) {
    return "Calendar";
  }
  
  // Design applications
  if (name.includes("photoshop") || name.includes("illustrator") || name.includes("figma") || 
      name.includes("sketch") || name.includes("canva") || name.includes("design")) {
    return "Design";
  }
  
  // Development environments
  if (name.includes("vscode") || name.includes("visual studio") || name.includes("intellij") || 
      name.includes("xcode") || name.includes("code editor")) {
    return "Development";
  }
  
  // Project management tools
  if (name.includes("jira") || name.includes("asana") || name.includes("trello") || 
      name.includes("monday") || name.includes("notion") || name.includes("project")) {
    return "Project Management";
  }
  
  return "Other Applications";
};

/**
 * Returns a suggested icon name based on the application category
 * For use with Lucide icons
 * 
 * @param {string} appName - The application name
 * @returns {string} - Icon name
 */
export const getSuggestedIcon = (appName: string): string => {
  const category = getApplicationCategory(appName);
  
  switch(category) {
    case "Word Processing":
      return "file-text";
    case "Spreadsheets":
      return "table";
    case "Presentations":
      return "presentation";
    case "PDF Documents":
      return "file";
    case "Email":
      return "mail";
    case "Calendar":
      return "calendar";
    case "Design":
      return "palette";
    case "Development":
      return "code";
    case "Project Management":
      return "kanban";
    default:
      return "app-window";
  }
};
