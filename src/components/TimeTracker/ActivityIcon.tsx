
import React from 'react';
import { FileText } from 'lucide-react';

interface ActivityIconProps {
  appName: string;
}

const ActivityIcon: React.FC<ActivityIconProps> = ({ appName }) => {
  return <FileText size={16} className="mr-2 flex-shrink-0" />;
};

export default ActivityIcon;
