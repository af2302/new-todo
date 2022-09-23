import React, { Component } from 'react';
import './TaskFilter.css';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  static defaultProps = {
    itemStatusFilter: 'all',
  };

  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    itemStatusFilter: PropTypes.string,
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { itemStatusFilter, onFilterChange } = this.props;

    const battons = this.buttons.map(({ name, label }) => {
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
}