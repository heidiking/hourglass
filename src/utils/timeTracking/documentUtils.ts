
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
