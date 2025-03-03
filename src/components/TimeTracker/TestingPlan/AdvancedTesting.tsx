
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AdvancedTesting: React.FC = () => {
  return (
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
      
      <h3 className="text-lg font-semibold mb-2 mt-4">6. Verification Process</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>After each test session, check "Recent Documents" tab to verify correct capture.</li>
        <li>Check the document name extraction accuracy.</li>
        <li>Verify time duration calculation matches your manual records (±2 minutes).</li>
        <li>Review "Insights & Metrics" to ensure data visualization is correctly updated.</li>
        <li>Test exporting or reporting of time data if applicable.</li>
      </ul>
      
      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 mt-4">
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
    </div>
  );
};

export default AdvancedTesting;
