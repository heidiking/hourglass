
// Extract document name from app title
export const extractDocumentName = (appName: string): string => {
  const documentPatterns = [
    { regex: /^(.*?)(?:\.docx?)?(?:\s*-\s*(?:Microsoft\s*)?Word|\.docx?)$/i, group: 1 },
    { regex: /^Microsoft Word - (.*?)(?:\.docx?)?$/i, group: 1 },
    { regex: /^(.*?) - Word$/i, group: 1 },
    
    { regex: /^(.*?)(?: \(.*\))?\s*-\s*Google\s*Docs/i, group: 1 },
    { regex: /^Google Docs - (.*?)$/i, group: 1 },
    
    { regex: /^(.*?)(?:\s*\.xlsx?)?\s*-\s*(?:Microsoft\s*)?Excel/i, group: 1 },
    { regex: /^(.*?)(?:\s*\.pptx?)?\s*-\s*(?:Microsoft\s*)?PowerPoint/i, group: 1 },
    
    { regex: /^(.*?)(?:\.pdf)?\s*-\s*(?:Adobe|PDF)/i, group: 1 },
    
    { regex: /^(.*?)\s*-\s*.*/, group: 1 }
  ];
  
  for (const pattern of documentPatterns) {
    const match = appName.match(pattern.regex);
    if (match && match[pattern.group]) {
      return match[pattern.group].trim();
    }
  }
  
  return appName;
};
