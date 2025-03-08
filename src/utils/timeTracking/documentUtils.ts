
/**
 * documentUtils.ts
 * 
 * Utilities for working with document names and formatting document-related data.
 */

/**
 * Extracts a document name from an application name or path
 * @param {string} appName - Raw application name or path
 * @returns {string} Cleaned document name
 */
export const extractDocumentName = (appName: string): string => {
  if (!appName || typeof appName !== 'string') {
    return 'Unknown Document';
  }

  try {
    // For file paths, extract the filename
    if (appName.includes('/') || appName.includes('\\')) {
      const parts = appName.split(/[/\\]/);
      const filename = parts[parts.length - 1];
      return filename || appName;
    }

    // For URLs, try to extract document name from the path
    if (appName.startsWith('http')) {
      try {
        const url = new URL(appName);
        const pathname = url.pathname;
        
        // If pathname has file extension, use that as document name
        if (pathname && pathname !== '/') {
          const pathParts = pathname.split('/');
          const lastPart = pathParts[pathParts.length - 1];
          if (lastPart && lastPart !== '') {
            return decodeURIComponent(lastPart);
          }
        }
        
        // If no document name in path, use hostname as document name
        return url.hostname || appName;
      } catch (e) {
        // If URL parsing fails, return original app name
        return appName;
      }
    }

    // For standard document apps, just return the app name
    return appName;
  } catch (error) {
    console.error('Error extracting document name:', error);
    return appName || 'Unknown Document';
  }
};

/**
 * Gets the category of an application based on its name
 * @param {string} appName - Application name
 * @returns {string} Category name
 */
export const getApplicationCategory = (appName: string): string => {
  if (!appName || typeof appName !== 'string') return 'Other';
  
  const name = appName.toLowerCase();
  
  // Document applications
  if (name.includes("word") || 
      name.includes("doc") || 
      name.includes(".doc") || 
      name.includes("pages") ||
      name.includes("text") ||
      name.includes("document")) {
    return 'Document';
  }
  
  // Spreadsheet applications
  if (name.includes("excel") || 
      name.includes("sheet") || 
      name.includes(".xls") || 
      name.includes("numbers") ||
      name.includes("spreadsheet") ||
      name.includes("table")) {
    return 'Spreadsheet';
  }
  
  // Presentation applications
  if (name.includes("powerpoint") || 
      name.includes("presentation") || 
      name.includes(".ppt") || 
      name.includes("keynote") ||
      name.includes("slide")) {
    return 'Presentation';
  }
  
  // PDF documents
  if (name.includes("pdf") || 
      name.includes(".pdf") ||
      name.includes("acrobat")) {
    return 'PDF';
  }
  
  // Email applications
  if (name.includes("mail") || 
      name.includes("outlook") || 
      name.includes("gmail") || 
      name.includes("inbox") ||
      name.includes("message")) {
    return 'Email';
  }
  
  // Calendar applications
  if (name.includes("calendar") || 
      name.includes("schedule") || 
      name.includes("appointment") ||
      name.includes("event")) {
    return 'Calendar';
  }
  
  // Design applications
  if (name.includes("photoshop") || 
      name.includes("illustrator") || 
      name.includes("figma") || 
      name.includes("sketch") ||
      name.includes("canva") ||
      name.includes("design")) {
    return 'Design';
  }
  
  // Development environments
  if (name.includes("vscode") || 
      name.includes("visual studio") || 
      name.includes("intellij") || 
      name.includes("xcode") ||
      name.includes("android studio") ||
      name.includes("sublime") ||
      name.includes("code editor")) {
    return 'Development';
  }
  
  // Project management tools
  if (name.includes("jira") || 
      name.includes("asana") || 
      name.includes("trello") || 
      name.includes("monday") ||
      name.includes("notion") ||
      name.includes("project") ||
      name.includes("task")) {
    return 'Project Management';
  }
  
  // Default category
  return 'Other';
};

/**
 * Gets the suggested icon name based on application name
 * @param {string} appName - Application name
 * @returns {string} Icon name to use
 */
export const getSuggestedIcon = (appName: string): string => {
  if (!appName || typeof appName !== 'string') return 'file';
  
  const name = appName.toLowerCase();
  const category = getApplicationCategory(name);
  
  switch(category) {
    case 'Document':
      return 'file-text';
    case 'Spreadsheet':
      return 'table';
    case 'Presentation':
      return 'presentation';
    case 'PDF':
      return 'file';
    case 'Email':
      return 'mail';
    case 'Calendar':
      return 'calendar';
    case 'Design':
      return 'palette';
    case 'Development':
      return 'code';
    case 'Project Management':
      return 'kanban';
    default:
      return 'file-text';
  }
};
