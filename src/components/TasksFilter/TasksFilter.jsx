import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

class TasksFilter extends React.Component {
  render() {
    const { filter, changeFilter } = this.props;

    return (
      <ul className="filters">
        <li>
          <button className={filter === 'All' ? 'selected' : null} type="button" onClick={() => changeFilter('All')}>
            All
          </button>
        </li>
        <li>
          <button
            className={filter === 'Active' ? 'selected' : null}
            type="button"
            onClick={() => changeFilter('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filter === 'Completed' ? 'selected' : null}
            type="button"
            onClick={() => changeFilter('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  filter: 'All',
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

export default TasksFilter;
