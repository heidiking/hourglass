
import React from 'react';
import { useSettingsState } from './Settings/useSettingsState';
import SettingsHeader from './Settings/SettingsHeader';
import SettingsContent from './Settings/SettingsContent';
import DocumentationView from './Settings/DocumentationView';
import ArchiveView from './Settings/ArchiveView';

interface SettingsDialogProps {
  onClose?: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onClose }) => {
  const {
    activeTab,
    setActiveTab,
    showDocumentation,
    setShowDocumentation,
    showMantraArchive,
    setShowMantraArchive,
    showQuoteArchive,
    setShowQuoteArchive,
    showImageArchive,
    setShowImageArchive,
    settings,
    handleSettingChange,
    saveSettings
  } = useSettingsState();
  
  if (showMantraArchive) {
    return <ArchiveView type="mantra" onClose={() => setShowMantraArchive(false)} />;
  }

  if (showQuoteArchive) {
    return <ArchiveView type="quote" onClose={() => setShowQuoteArchive(false)} />;
  }
  
  if (showImageArchive) {
    return <ArchiveView type="image" onClose={() => setShowImageArchive(false)} />;
  }
  
  if (showDocumentation) {
    return <DocumentationView onClose={() => setShowDocumentation(false)} />;
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <SettingsHeader 
        onShowDocumentation={() => setShowDocumentation(true)}
        onSaveSettings={() => saveSettings(onClose)}
      />
      
      <SettingsContent 
        activeTab={activeTab}
        settings={settings}
        handleSettingChange={handleSettingChange}
        onViewMantraArchive={() => setShowMantraArchive(true)}
        onViewQuoteArchive={() => setShowQuoteArchive(true)}
        onViewImageArchive={() => setShowImageArchive(true)}
      />
    </div>
  );
};

export default SettingsDialog;
