
import React from 'react';
import { FileText } from 'lucide-react';
import { ActivitySession } from '@/utils/timeTracking/types';
import ActivityItem from './ActivityItem';

interface RecentDocumentsSectionProps {
  documentActivities: ActivitySession[];
}

const RecentDocumentsSection: React.FC<RecentDocumentsSectionProps> = ({ documentActivities }) => {
  // Group activities by date
  const groupedActivities = React.useMemo(() => {
    return documentActivities.reduce((acc, activity) => {
      const date = new Date(activity.startTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {} as {[key: string]: ActivitySession[]});
  }, [documentActivities]);

  // Sort dates in descending order (newest first)
  const sortedDates = React.useMemo(() => {
    return Object.keys(groupedActivities).sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    );
  }, [groupedActivities]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <FileText size={16} className="mr-2" />
        Recent Documents
      </h3>
      
      {documentActivities.length > 0 ? (
        <div className="space-y-4">
          {sortedDates.map(date => (
            <div key={date} className="space-y-2">
              <h4 className="text-sm font-medium bg-black/10 p-2 rounded">{date}</h4>
              <div className="space-y-2">
                {groupedActivities[date].map((activity, index) => 
                  <ActivityItem key={index} activity={activity} />
                )}
              </div>
            </div>
          ))}
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
