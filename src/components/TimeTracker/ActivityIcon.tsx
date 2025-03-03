
import React from 'react';
import { 
  FileText, 
  Mail, 
  Calendar, 
  Code, 
  Palette, 
  KanbanSquare,
  Table,
  Presentation,
  File,
  Globe,
  MessageCircle,
  Play
} from 'lucide-react';
import { getSuggestedIcon } from '@/utils/timeTracking/documentUtils';

interface ActivityIconProps {
  appName: string;
}

const ActivityIcon: React.FC<ActivityIconProps> = ({ appName }) => {
  const iconName = getSuggestedIcon(appName);
  
  switch(iconName) {
    case 'file-text':
      return <FileText size={16} className="mr-2 text-blue-500 flex-shrink-0" />;
    case 'table':
      return <Table size={16} className="mr-2 text-green-500 flex-shrink-0" />;
    case 'presentation':
      return <Presentation size={16} className="mr-2 text-orange-500 flex-shrink-0" />;
    case 'file':
      return <File size={16} className="mr-2 text-red-500 flex-shrink-0" />;
    case 'mail':
      return <Mail size={16} className="mr-2 text-blue-600 flex-shrink-0" />;
    case 'calendar':
      return <Calendar size={16} className="mr-2 text-purple-600 flex-shrink-0" />;
    case 'palette':
      return <Palette size={16} className="mr-2 text-pink-600 flex-shrink-0" />;
    case 'code':
      return <Code size={16} className="mr-2 text-gray-600 flex-shrink-0" />;
    case 'kanban':
      return <KanbanSquare size={16} className="mr-2 text-green-600 flex-shrink-0" />;
    case 'browser':
      return <Globe size={16} className="mr-2 text-blue-400 flex-shrink-0" />;
    case 'message-circle':
      return <MessageCircle size={16} className="mr-2 text-purple-400 flex-shrink-0" />;
    case 'play':
      return <Play size={16} className="mr-2 text-red-400 flex-shrink-0" />;
    default:
      return <FileText size={16} className="mr-2 text-gray-500 flex-shrink-0" />;
  }
};

export default ActivityIcon;
