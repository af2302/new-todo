import React from 'react';
import './TaskFilter.css';



const TaskFilter = (props) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];
  const { itemStatusFilter, onFilterChange } = props;

  const battons = buttons.map(({ name, label }) => {
    const isActive = itemStatusFilter === name;
    const className = isActive ? 'selected' : '';

    return (
      <li key={name}>
        <button className={className} type="button" onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{battons}</ul>;
}


export default TaskFilter;