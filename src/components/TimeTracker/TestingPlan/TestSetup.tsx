
import React from 'react';

const TestSetup: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">1. Test Setup</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Clear activity history before testing (use the "Clear History" button)</li>
        <li>Have a variety of applications ready to use for testing</li>
        <li>Record actual start and end times manually for verification</li>
        <li>Plan for 5-10 minute test sessions for each application type</li>
      </ul>
    </div>
  );
};

export default TestSetup;
