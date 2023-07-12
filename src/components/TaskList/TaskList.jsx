import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

function TaskList(props) {
  const { todos, deleteItem, checkItem, editItem, timerUpdate } = props;

  return (
    <ul className="todo-list">
      {todos.map(item => {
        const { id } = item;

        return (
          <Task
            key={id}
            todo={item}
            timerUpdate={timerUpdate}
            deleteItem={() => deleteItem(id)}
            checkItem={() => checkItem(id)}
            editItem={editItem}
          />
        );
      })}
    </ul>
  );
}

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.any,
  checkItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  timerUpdate: PropTypes.func.isRequired,
};

export default TaskList;
