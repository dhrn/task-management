export enum TaskStatus  {
    'TO_DO' = 'To do',
    'IN_PROGRESS' = 'In Progress',
    'DONE' = 'Done'
}

export type Task = {
    id: string,
    title: string;
    description: string;
    status: TaskStatus
}



export interface TaskFormProps {
    addTask: (task: Task) => Promise<void>;
  }
  

export  interface TaskListProps {
    tasks: Task[];
    updateTask: (taskId: string, updatedTask: Task) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
  }

 export interface TaskItemProps {
    task: Task;
    updateTask: (taskId: string, updatedTask: Task) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
  }


  export interface FilterDropdownProps {
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  }
  