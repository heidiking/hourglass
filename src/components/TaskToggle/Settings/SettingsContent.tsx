
import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import MantraSettings from './MantraSettings';
import QuoteSettings from './QuoteSettings';
import ImageSettings from './ImageSettings';

interface SettingsContentProps {
  activeTab: string;
  settings: {
    customMantra: string;
    customQuote: string;
    customQuoteAuthor: string;
    customImageUrl?: string;
    customImageAuthor?: string;
    customImageLocation?: string;
  };
  handleSettingChange: (key: string, value: any) => void;
  onViewMantraArchive: () => void;
  onViewQuoteArchive: () => void;
  onViewImageArchive: () => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
  activeTab,
  settings,
  handleSettingChange,
  onViewMantraArchive,
  onViewQuoteArchive,
  onViewImageArchive
}) => {
  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2 py-4">
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsContent value="settings" className="space-y-6">
          {/* Custom Mantra Section */}
          <MantraSettings 
            mantra={settings.customMantra}
            onChange={value => handleSettingChange('customMantra', value)}
            onViewArchive={onViewMantraArchive}
          />

          {/* Custom Quote Section */}
          <QuoteSettings 
            quote={settings.customQuote}
            author={settings.customQuoteAuthor}
            onQuoteChange={value => handleSettingChange('customQuote', value)}
            onAuthorChange={value => handleSettingChange('customQuoteAuthor', value)}
            onViewArchive={onViewQuoteArchive}
          />

          {/* Custom Image Section */}
          <ImageSettings
            imageUrl={settings.customImageUrl || ''}
            author={settings.customImageAuthor || ''}
            location={settings.customImageLocation || ''}
            onImageUrlChange={value => handleSettingChange('customImageUrl', value)}
            onAuthorChange={value => handleSettingChange('customImageAuthor', value)}
            onLocationChange={value => handleSettingChange('customImageLocation', value)}
            onViewArchive={onViewImageArchive}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsContent;
