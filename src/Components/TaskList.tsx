// TaskList.js
import React, { useState } from 'react';
import TaskItem from './TaskItem';
import FilterDropdown from './FilterDropdown';
import { TaskListProps } from './types';

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTasks = statusFilter === 'All' ? tasks : tasks.filter(task => task.status === statusFilter);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status <FilterDropdown statusFilter={statusFilter} setStatusFilter={setStatusFilter} /></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
