
import React from 'react';
import { formatTimeDuration } from './utils';
import { ActivitySession } from '@/utils/timeTracking/types';
import { 
  FileText, 
  Mail, 
  Calendar, 
  Code, 
  Palette, 
  KanbanSquare,
  Table,
  Presentation,
  File
} from 'lucide-react';
import { getApplicationCategory, getSuggestedIcon } from '@/utils/timeTracking/documentUtils';

interface ActivityItemProps {
  activity: ActivitySession;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const formattedDuration = formatTimeDuration(activity.duration);
  const category = getApplicationCategory(activity.appName);
  const iconName = getSuggestedIcon(activity.appName);
  
  const getIconComponent = () => {
    switch(iconName) {
      case 'file-text':
        return <FileText size={16} className="mr-2 text-blue-500" />;
      case 'table':
        return <Table size={16} className="mr-2 text-green-500" />;
      case 'presentation':
        return <Presentation size={16} className="mr-2 text-orange-500" />;
      case 'file':
        return <File size={16} className="mr-2 text-red-500" />;
      case 'mail':
        return <Mail size={16} className="mr-2 text-blue-600" />;
      case 'calendar':
        return <Calendar size={16} className="mr-2 text-purple-600" />;
      case 'palette':
        return <Palette size={16} className="mr-2 text-pink-600" />;
      case 'code':
        return <Code size={16} className="mr-2 text-gray-600" />;
      case 'kanban':
        return <KanbanSquare size={16} className="mr-2 text-green-600" />;
      default:
        return <FileText size={16} className="mr-2 text-gray-500" />;
    }
  };

  return (
    <div className="flex p-2 rounded-md bg-white/10 hover:bg-white/15 items-center">
      {getIconComponent()}
      
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate text-black">
          {activity.appName}
        </div>
        
        <div className="text-xs text-black flex items-center">
          <span className="hidden sm:inline">{category} • </span>
          <span>{new Date(activity.startTime).toLocaleTimeString()}</span>
          <span className="mx-1">-</span>
          <span>{activity.endTime ? new Date(activity.endTime).toLocaleTimeString() : 'Ongoing'}</span>
        </div>
      </div>
      
      <div className="text-right whitespace-nowrap">
        <div className="font-medium text-black">{formattedDuration}</div>
      </div>
    </div>
  );
};

export default ActivityItem;
