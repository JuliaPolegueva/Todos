import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

import './Footer.css';

function Footer(props) {
  //Не выполненные элементы
  const { filter, lefts, changeFilter, clearCompleted } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{lefts} items left</span>
      <TasksFilter filter={filter} changeFilter={changeFilter} />
      <button className="clear-completed" type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  lefts: 0,
  filter: 'All',
};

Footer.propTypes = {
  lefts: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default Footer;
