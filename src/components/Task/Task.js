import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

class Task extends React.Component {
  state = {
    label: '',
    editing: false,
  };

  //Обработка событий при отправки формы, вызывает ф-цию добавления элемента

  onSubmit = event => {
    event.preventDefault();

    this.props.editItem(this.props.todo.id, this.state.label);

    this.setState({
      label: '',
      editing: false,
    });
  };

  render() {
    //Данные с TaskList деструктуризация
    const { todo, timer, deleteItem, checkItem, countdownTime, stopTime } = this.props;
    const { body, min, sec, checked, date } = todo;

    return (
      //Классы li в зависимости от состояния
      <li className={checked ? 'completed' : this.state.editing ? 'editing' : null}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            //Функция выполнения задачи
            onChange={checkItem}
            checked={checked}
          />
          <label>
            <span className="title">{body}</span>
            <span className="description">
              <button className="icon icon-play" onClick={timer ? () => {} : countdownTime}></button>
              <button className="icon icon-pause" onClick={stopTime}></button>
              {min}:{sec}
            </span>
            <span className="description">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button
            className="icon icon-edit"
            //Функция редактирования задачи
            onClick={() => this.setState(({ editing }) => ({ editing: !editing, label: this.props.todo.body }))}
          ></button>
          <button className="icon icon-destroy" onClick={deleteItem}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            onChange={event => this.setState({ label: event.target.value })}
            value={this.state.label}
          />
        </form>
      </li>
    );
  }
}

Task.defaultProps = {
  todo: {},
};

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    min: PropTypes.number,
    sec: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    checked: PropTypes.bool,
  }),
  deleteItem: PropTypes.func.isRequired,
  checkItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  countdownTime: PropTypes.func.isRequired,
  stopTime: PropTypes.func.isRequired,
  timer: PropTypes.bool,
};

export default Task;
