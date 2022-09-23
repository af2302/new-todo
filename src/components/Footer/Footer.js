import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter/TaskFilter';

const Footer = ({ taskCount, itemStatusFilter, onFilterChange, clearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">{taskCount} items left</span>
    <TaskFilter itemStatusFilter={itemStatusFilter} onFilterChange={onFilterChange} />
    <button className="clear-completed" type="button" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  itemStatusFilter: 'all',
  taskCount: null,
};

Footer.propTypes = {
  itemStatusFilter: PropTypes.string,
  taskCount: PropTypes.number,
  onFilterChange: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;