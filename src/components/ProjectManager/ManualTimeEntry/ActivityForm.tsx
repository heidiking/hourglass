
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign } from 'lucide-react';
import { ManualActivity } from '../types';

interface ActivityFormProps {
  newActivityName: string;
  setNewActivityName: (name: string) => void;
  newActivityTime: string;
  setNewActivityTime: (time: string) => void;
  newActivityTimeUnit: string;
  setNewActivityTimeUnit: (unit: string) => void;
  activityDate: string;
  setActivityDate: (date: string) => void;
  newActivityEarnings: string;
  setNewActivityEarnings: (earnings: string) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  newActivityName,
  setNewActivityName,
  newActivityTime,
  setNewActivityTime,
  newActivityTimeUnit,
  setNewActivityTimeUnit,
  activityDate,
  setActivityDate,
  newActivityEarnings,
  setNewActivityEarnings
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="activity-name" className="text-sm text-gray-700 dark:text-gray-300">Activity Name</Label>
        <Input
          id="activity-name"
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
          placeholder="Activity name"
          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label htmlFor="activity-date" className="text-sm text-gray-700 dark:text-gray-300">Date</Label>
          <Input
            id="activity-date"
            type="date"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="activity-duration" className="text-sm text-gray-700 dark:text-gray-300">Duration</Label>
          <div className="flex items-center gap-1">
            <Input
              id="activity-duration"
              type="number"
              value={newActivityTime}
              onChange={(e) => setNewActivityTime(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-black w-20"
              min="0"
            />
            
            <select 
              id="activity-unit"
              value={newActivityTimeUnit}
              onChange={(e) => setNewActivityTimeUnit(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black rounded px-2 py-2 flex-1"
            >
              <option value="minute">M</option>
              <option value="hour">H</option>
              <option value="day">D</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="activity-earnings" className="text-sm text-gray-700 dark:text-gray-300">Earnings</Label>
          <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded">
            <div className="flex items-center px-2">
              <DollarSign size={16} className="text-green-500" />
            </div>
            <Input
              id="activity-earnings"
              type="number"
              step="0.01"
              min="0"
              value={newActivityEarnings}
              onChange={(e) => setNewActivityEarnings(e.target.value)}
              className="border-0 bg-transparent h-10 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black w-24"
              placeholder="Amount"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityForm;
