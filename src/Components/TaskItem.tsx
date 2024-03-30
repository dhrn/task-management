import React from 'react';
import { TaskItemProps, TaskStatus } from './types';

const TaskItem : React.FC<TaskItemProps> = ({ task, updateTask, deleteTask }) => {
  const handleStatusChange =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask(task.id, { ...task, status: e.target.value as TaskStatus });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>
      <select value={task.status} onChange={handleStatusChange}>
        <option value={TaskStatus.TO_DO}>To Do</option>
        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
        <option value={TaskStatus.DONE}>Done</option>
      </select>
      </td>
      <td>
      <button  className='button-delete' onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default TaskItem;
