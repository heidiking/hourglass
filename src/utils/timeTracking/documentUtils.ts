
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
