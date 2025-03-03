
import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import MantraSettings from './MantraSettings';
import QuoteSettings from './QuoteSettings';
import TimeTrackingSettings from './TimeTrackingSettings';

interface SettingsContentProps {
  activeTab: string;
  settings: {
    trackDormantActivity: boolean;
    autoTrackEnabled: boolean;
    startTime: string;
    endTime: string;
    hasValidTimes: boolean;
    customMantra: string;
    customQuote: string;
    customQuoteAuthor: string;
  };
  handleSettingChange: (key: string, value: any) => void;
  onViewMantraArchive: () => void;
  onViewQuoteArchive: () => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({
  activeTab,
  settings,
  handleSettingChange,
  onViewMantraArchive,
  onViewQuoteArchive
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

          {/* Time Tracking Section */}
          <TimeTrackingSettings 
            settings={settings}
            onSettingChange={handleSettingChange}
            hasValidTimes={settings.hasValidTimes}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsContent;
