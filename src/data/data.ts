export const tableHeaderActArchv = [
  'Title', 'Created At', 'Category', 'Description', 'Dates',
];

export const tableHeaderStat = [
  'Category', 'Active', 'Archived',
];

export enum Category {
  'Task' = 'Task',
  'Random Thought' = 'Random Thought',
  'Idea' = 'Idea',
}

export interface Notes {
  id: number;
  title: string;
  createdAt: string;
  category: string;
  description: string;
  active: boolean;
}
