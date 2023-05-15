import React from "react";
import Task from "../Task";
import PropTypes from "prop-types";

import "./TaskList.css";

class TaskList extends React.Component {
  render() {
    const { todos, timer, deleteItem, checkItem, editItem, countdownTime, stopTime } = this.props;

    return (
      <ul className="todo-list">
        {todos.map(item => {
          const { id, min, sec } = item;

          return (
            <Task
              key={id}
              todo={item}
              timer={timer}
              deleteItem={() => deleteItem(id)}
              checkItem={() => checkItem(id)}
              editItem={editItem}
              countdownTime={() => countdownTime(id, min, sec)}
              stopTime={() => stopTime()}
            />
          );
        })}
      </ul>
    );
  }
}

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.any,
  checkItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  countdownTime: PropTypes.func.isRequired,
  stopTime: PropTypes.func.isRequired,
};

export default TaskList;
