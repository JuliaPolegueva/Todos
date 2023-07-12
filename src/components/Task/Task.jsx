import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

function Task(props) {
  const [label, setLabel] = useState('');
  const [editing, setEditing] = useState(false);

  const [timer, setTimer] = useState(false);
  const [startTime, setStartTime] = useState(-1);

  const { todo, deleteItem, checkItem, editItem, timerUpdate } = props;
  const { id, body, min, sec, checked, date } = todo;

  //Обработка событий при отправки формы, вызывает ф-цию добавления элемента

  function onSubmit(event) {
    event.preventDefault();

    editItem(id, label);

    setLabel('');
    setEditing(false);
  }

  function editTask() {
    setEditing(editing => !editing);
    setLabel(body);
  }

  useEffect(() => {
    const stopTimer = setInterval(() => {
      if (timer) {
        setStartTime(startTime => startTime - 1);

        const newMin = Math.floor(startTime / 60);
        const newSec = startTime % 60;

        countdownTime(id, newMin, newSec);
      }
    }, 1000);

    if (startTime < 0) setTimer(false);

    return () => {
      clearInterval(stopTimer);
    };
  }, [startTime, timer]);

  function countdownTime(id, min, sec) {
    if (startTime === -1) setStartTime(Math.floor(min * 60 + sec));

    setTimer(true);
    timerUpdate(id, min, sec);
  }

  function stopTime() {
    setTimer(false);
  }

  return (
    <li className={checked ? 'completed' : editing ? 'editing' : null}>
      <div className="view">
        <input className="toggle" type="checkbox" id={id} onChange={checkItem} checked={checked} />
        <label htmlFor={id}>
          <span className="title">{body}</span>
          <span className="description">
            <button
              className="icon icon-play"
              type="button"
              onClick={timer ? () => {} : () => countdownTime(id, min, sec)}
            ></button>
            <button className="icon icon-pause" type="button" onClick={stopTime}></button>
            {min}:{sec}
          </span>
          <span className="description">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" type="button" onClick={() => editTask()}></button>
        <button className="icon icon-destroy" type="button" onClick={deleteItem}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          ref={input => input && input.focus()}
          autoFocus={true}
          type="text"
          className="edit"
          onChange={event => setLabel(event.target.value)}
          value={label}
        />
      </form>
    </li>
  );
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
  timerUpdate: PropTypes.func.isRequired,
};

export default Task;
