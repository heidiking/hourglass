
import React from 'react';
import { Palette, Code } from 'lucide-react';
import TestingCategory from './TestingCategory';

const CreativeTesting: React.FC = () => {
  return (
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
  );
};

export default CreativeTesting;
