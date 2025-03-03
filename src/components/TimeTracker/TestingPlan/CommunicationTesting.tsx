
import React from 'react';
import { Mail, Calendar, KanbanSquare } from 'lucide-react';
import TestingCategory from './TestingCategory';

const CommunicationTesting: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">3. Communication & Planning Testing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TestingCategory 
          title="Email Applications" 
          icon={<Mail className="h-5 w-5 text-blue-600" />}
          applications={['Gmail', 'Outlook', 'Apple Mail']}
          testCases={[
            'Compose and send emails',
            'Read and respond to messages',
            'Organize inbox folders'
          ]}
        />
        
        <TestingCategory 
          title="Calendar Applications" 
          icon={<Calendar className="h-5 w-5 text-purple-600" />}
          applications={['Google Calendar', 'Outlook Calendar', 'Apple Calendar']}
          testCases={[
            'Create and edit events',
            'View monthly/weekly schedules',
            'Set up meeting invitations'
          ]}
        />
        
        <TestingCategory 
          title="Project Management" 
          icon={<KanbanSquare className="h-5 w-5 text-green-600" />}
          applications={['Jira', 'Asana', 'Trello', 'Notion']}
          testCases={[
            'Create and update tasks',
            'Organize project boards',
            'Track progress on projects'
          ]}
        />
      </div>
    </div>
  );
};

export default CommunicationTesting;
