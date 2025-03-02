
import React from 'react';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export type ToolButton = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};
