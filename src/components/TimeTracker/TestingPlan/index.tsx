
import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import TestSetup from './TestSetup';
import DocumentTesting from './DocumentTesting';
import CommunicationTesting from './CommunicationTesting';
import CreativeTesting from './CreativeTesting';
import AdvancedTesting from './AdvancedTesting';

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
          <TestSetup />
          <DocumentTesting />
          <CommunicationTesting />
          <CreativeTesting />
          <AdvancedTesting />
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingPlan;
