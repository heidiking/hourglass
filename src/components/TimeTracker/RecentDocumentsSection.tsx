
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { ActivitySession } from '@/utils/timeTracking/types';
import ActivityItem from './ActivityItem';

interface RecentDocumentsSectionProps {
  documentActivities: ActivitySession[];
}

const RecentDocumentsSection: React.FC<RecentDocumentsSectionProps> = ({ documentActivities }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <FileText size={16} className="mr-2" />
        Recent Documents
      </h3>
      {documentActivities.length > 0 ? (
        <div className="space-y-2">
          {documentActivities.map((activity, index) => 
            <ActivityItem key={index} activity={activity} />
          )}
        </div>
      ) : (
        <div className="p-3 bg-black/10 rounded-md text-gray-500">
          No document activity recorded yet
        </div>
      )}
    </div>
  );
};

export default RecentDocumentsSection;
