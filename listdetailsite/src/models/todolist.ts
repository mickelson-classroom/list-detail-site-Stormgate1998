export interface ToDoList {
  id: number;
  title: string;
  content: string;
  steps: Array<{ index: number; value: string }>;
};

export const list: ToDoList[] = [
  {
    id: 1,
    title: 'Make Bed',
    content: 'Make your bed. Yes, actually.',
    steps: []
  },
  {
    id: 2,
    title: 'Trash',
    content: 'Take Out the Trash',
    steps: []
  },
  {
    id: 3,
    title: 'Do React Homework',
    content: 'Just check Canvas for the details',
    steps: []
  },
];
