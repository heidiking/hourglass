
import React from 'react';
import { 
  Check, 
  ClipboardCheck, 
  AlertTriangle, 
  FileText, 
  Mail, 
  Calendar, 
  Code, 
  Palette,
  KanbanSquare,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getApplicationCategory } from "@/utils/timeTracking/documentUtils";

const TestingPlan: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto text-black">
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <ClipboardCheck className="mr-2 h-5 w-5 text-black" />
            <CardTitle>Structured Testing Plan for TimeTracker</CardTitle>
          </div>
          <CardDescription>
            A step-by-step guide to verify time tracking functionality across different applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Test Setup</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Clear activity history before testing (use the "Clear History" button)</li>
              <li>Have a variety of applications ready to use for testing</li>
              <li>Record actual start and end times manually for verification</li>
              <li>Plan for 5-10 minute test sessions for each application type</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">2. Document Application Testing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TestingCategory 
                title="Word Processing" 
                icon={<FileText className="h-5 w-5 text-blue-600" />}
                applications={['Microsoft Word', 'Google Docs', 'Apple Pages']}
                testCases={[
                  'Create a new document and type for 5 minutes',
                  'Open an existing document and make edits',
                  'Switch between multiple documents'
                ]}
              />
              
              <TestingCategory 
                title="Spreadsheets" 
                icon={<FileText className="h-5 w-5 text-green-600" />}
                applications={['Microsoft Excel', 'Google Sheets', 'Apple Numbers']}
                testCases={[
                  'Work with formulas and calculations',
                  'Format data in multiple worksheets',
                  'Create and edit charts'
                ]}
              />
              
              <TestingCategory 
                title="Presentations" 
                icon={<FileText className="h-5 w-5 text-orange-600" />}
                applications={['Microsoft PowerPoint', 'Google Slides', 'Apple Keynote']}
                testCases={[
                  'Create slides with text and images',
                  'Edit an existing presentation',
                  'Practice presentation mode'
                ]}
              />
              
              <TestingCategory 
                title="PDF Documents" 
                icon={<FileText className="h-5 w-5 text-red-600" />}
                applications={['Adobe Acrobat', 'Preview', 'Chrome PDF Viewer']}
                testCases={[
                  'Read a PDF document for 5 minutes',
                  'Add annotations or comments',
                  'Fill out PDF forms'
                ]}
              />
            </div>
          </div>
          
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
          
          <div>
            <h3 className="text-lg font-semibold mb-2">4. Creative & Development Testing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TestingCategory 
                title="Design Applications" 
                icon={<Palette className="h-5 w-5 text-pink-600" />}
                applications={['Photoshop', 'Illustrator', 'Figma', 'Sketch']}
                testCases={[
                  'Edit images or create graphics',
                  'Work on UI/UX design projects',
                  'Create vector illustrations'
                ]}
              />
              
              <TestingCategory 
                title="Development Tools" 
                icon={<Code className="h-5 w-5 text-gray-600" />}
                applications={['VSCode', 'IntelliJ', 'Xcode', 'Android Studio']}
                testCases={[
                  'Write and debug code',
                  'Use multiple editor windows',
                  'Run tests and compile projects'
                ]}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">5. Advanced Testing Scenarios</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Rapid Application Switching:</span>
                <p className="text-sm">Quickly switch between multiple applications every 30 seconds for 5 minutes and verify correct tracking.</p>
              </li>
              <li>
                <span className="font-medium">Long Duration Test:</span>
                <p className="text-sm">Work in a single application for 30+ minutes to verify extended tracking works correctly.</p>
              </li>
              <li>
                <span className="font-medium">Idle Detection:</span>
                <p className="text-sm">Leave an application open without interaction for 10 minutes to test how inactive time is handled.</p>
              </li>
              <li>
                <span className="font-medium">Multiple Document Test:</span>
                <p className="text-sm">Open multiple documents of the same type and switch between them to verify document name tracking.</p>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">6. Verification Process</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>After each test session, check "Recent Documents" tab to verify correct capture.</li>
              <li>Check the document name extraction accuracy.</li>
              <li>Verify time duration calculation matches your manual records (±2 minutes).</li>
              <li>Review "Insights & Metrics" to ensure data visualization is correctly updated.</li>
              <li>Test exporting or reporting of time data if applicable.</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
            <h4 className="flex items-center text-amber-800 font-medium">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Important Notes
            </h4>
            <ul className="text-amber-700 text-sm mt-1 space-y-1">
              <li>The web application uses a mock detection system - you may need to manually start tracking.</li>
              <li>Actual time tracking may require platform-specific integrations.</li>
              <li>Document the results of each test for future comparison.</li>
              <li>Note any discrepancies or improvements needed in the tracking logic.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface TestingCategoryProps {
  title: string;
  icon: React.ReactNode;
  applications: string[];
  testCases: string[];
}

const TestingCategory: React.FC<TestingCategoryProps> = ({ 
  title, 
  icon, 
  applications, 
  testCases 
}) => {
  return (
    <div className="border rounded-md p-3 bg-white">
      <h4 className="font-medium flex items-center mb-2">
        {icon}
        <span className="ml-1">{title}</span>
      </h4>
      <div className="text-sm">
        <div className="mb-2">
          <p className="text-gray-700 mb-1">Applications to test:</p>
          <ul className="pl-5 list-disc text-gray-600">
            {applications.map((app, i) => (
              <li key={i}>{app}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-gray-700 mb-1">Test cases:</p>
          <ul className="pl-5 list-disc text-gray-600">
            {testCases.map((testCase, i) => (
              <li key={i} className="flex items-start">
                <span>{testCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestingPlan;
