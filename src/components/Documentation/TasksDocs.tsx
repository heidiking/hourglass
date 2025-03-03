
import React from 'react';
import { CheckSquare, ListTodo, Star, Archive } from 'lucide-react';

const TasksDocs = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Tasks & Goals Documentation</h2>
      
      <div className="text-gray-700 space-y-4">
        <p>
          The Tasks feature allows you to manage your daily tasks, set goals, and track your accomplishments. 
          It integrates with the core productivity features of the application to help you organize your work 
          and stay on track.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">How to Access Tasks</h3>
        <p>
          Click on the <CheckSquare className="inline h-4 w-4 text-black" /> icon in the tools panel at the bottom right of your screen.
        </p>
        
        <h3 className="text-xl font-medium text-black mt-6">Task Management Interface</h3>
        <p>
          The Tasks dialog provides a comprehensive task management system:
        </p>
        
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <ListTodo className="h-4 w-4 mr-2 text-blue-600" />
              Daily Tasks
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Manage your tasks for the current day:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Add new tasks using the input field at the top</li>
                <li>Check off completed tasks</li>
                <li>Drag and drop to reorder tasks based on priority</li>
                <li>Edit tasks by clicking on them</li>
                <li>Delete tasks that are no longer relevant</li>
              </ul>
              <p className="mt-2">
                Tasks are organized in a simple, intuitive list that makes it easy to focus on what needs to be done.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Star className="h-4 w-4 mr-2 text-amber-500" />
              Daily Focus Goals
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Set and track your main focus objectives for the day:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Enter your primary goal for the day in the main input field on the home screen</li>
                <li>Your current focus goal is displayed prominently to keep it top of mind</li>
                <li>Mark goals complete when you achieve them</li>
                <li>View a summary of your goal progress in the Tasks dialog</li>
              </ul>
              <p className="mt-2">
                Focus goals help you identify and commit to your most important objective each day.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium flex items-center text-black">
              <Archive className="h-4 w-4 mr-2 text-purple-600" />
              Goal Archive
            </h4>
            <div className="ml-6 mt-2">
              <p>
                Review and analyze your past goals and achievements:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2">
                <li>Access the Goal Archive by clicking on the archive icon in the tools panel</li>
                <li>View a chronological history of your completed goals</li>
                <li>Filter goals by date, status, or keywords</li>
                <li>Analyze trends in your goal completion rates</li>
                <li>Reflect on past achievements to inform future goal setting</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-black mt-6">Adding and Managing Tasks</h3>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Open the Tasks dialog</li>
          <li>Use the "Add a new task..." input field at the top</li>
          <li>Type your task description</li>
          <li>Press Enter or click the + button to add the task</li>
          <li>To complete a task, click the checkbox next to it</li>
          <li>To edit a task, click on its text</li>
          <li>To delete a task, click the trash icon</li>
        </ol>
        
        <h3 className="text-xl font-medium text-black mt-6">Setting Daily Focus Goals</h3>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>On the main screen, locate the focus input field in the center</li>
          <li>Enter your most important goal for the day</li>
          <li>Press Enter to set it as your current focus</li>
          <li>Your focus goal will appear prominently on the main screen</li>
          <li>When completed, check it off to mark it as accomplished</li>
        </ol>
        
        <h3 className="text-xl font-medium text-black mt-6">Using the Goal Archive</h3>
        <p>
          The Goal Archive helps you track your progress over time:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-2">
          <li>Click on the archive icon in the tools panel</li>
          <li>Browse through your historical goals organized by date</li>
          <li>Use the filters to find specific goals</li>
          <li>Review analytics about your goal completion rates</li>
          <li>Export your goal history if needed</li>
        </ol>
        
        <h3 className="text-xl font-medium text-black mt-6">Integrating Tasks with Time Tracking</h3>
        <p>
          For maximum productivity, integrate your tasks with time tracking:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Set a clear focus goal that aligns with your most important task</li>
          <li>Use Focus Mode to block distractions while working on critical tasks</li>
          <li>Track time spent on documents related to specific tasks</li>
          <li>Associate tasks with projects in the Project Manager</li>
          <li>Review time tracking data to improve future task time estimates</li>
        </ul>
        
        <h3 className="text-xl font-medium text-black mt-6">Tips for Effective Task Management</h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Limit your daily task list to 3-5 important items to maintain focus</li>
          <li>Set one clear focus goal each day that represents your highest priority</li>
          <li>Review and plan your tasks at the end of each day for the following day</li>
          <li>Use the Goal Archive to reflect on patterns and improve your productivity system</li>
          <li>Break larger projects into smaller, manageable tasks</li>
          <li>Consider using the Pomodoro technique with Focus Mode for better task focus</li>
        </ul>
      </div>
    </div>
  );
};

export default TasksDocs;
