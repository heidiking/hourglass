
import React from 'react';
import Documentation from '../../Documentation';
import BackToSettingsButton from './BackToSettingsButton';

interface DocumentationViewProps {
  onClose: () => void;
}

const DocumentationView: React.FC<DocumentationViewProps> = ({ onClose }) => {
  return (
    <div className="relative">
      <BackToSettingsButton onClick={onClose} />
      <Documentation />
    </div>
  );
};

export default DocumentationView;
