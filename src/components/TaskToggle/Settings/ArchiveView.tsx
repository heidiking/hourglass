
import React from 'react';
import BackToSettingsButton from './BackToSettingsButton';
import MantraArchive from './MantraArchive';
import QuoteArchive from './QuoteArchive';
import ImageArchive from './ImageArchive';

interface ArchiveViewProps {
  type: 'mantra' | 'quote' | 'image';
  onClose: () => void;
}

const ArchiveView: React.FC<ArchiveViewProps> = ({ type, onClose }) => {
  return (
    <div className="relative">
      <BackToSettingsButton onClick={onClose} />
      {type === 'mantra' && <MantraArchive />}
      {type === 'quote' && <QuoteArchive />}
      {type === 'image' && <ImageArchive />}
    </div>
  );
};

export default ArchiveView;
