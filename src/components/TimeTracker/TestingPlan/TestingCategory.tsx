
import React from 'react';

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

export default TestingCategory;
