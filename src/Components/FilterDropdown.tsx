// FilterDropdown.js
import React from 'react';
import { FilterDropdownProps, TaskStatus } from './types';

const FilterDropdown: React.FC<FilterDropdownProps>  = ({ statusFilter, setStatusFilter }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)  => {
    setStatusFilter(e.target.value);
  };

  return (
    <select value={statusFilter} onChange={handleChange}>
      <option value="All">All</option>
      <option value={TaskStatus.TO_DO}>To Do</option>
      <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
      <option value={TaskStatus.DONE}>Done</option>
    </select>
  );
};

export default FilterDropdown;
