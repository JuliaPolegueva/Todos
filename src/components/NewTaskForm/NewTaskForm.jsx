/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

function NewTaskForm(props) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  //Изменяет состояние label при вводе текста в input

  function onLabelChange(event) {
    const target = event.target;

    if (target.name === 'sec' && target.value > 60) {
      target.value = 60;

      setSec(target.value);
    }

    target.name === 'label'
      ? setLabel(target.value)
      : target.name === 'min'
      ? setMin(target.value)
      : setSec(target.value);
  }

  //Обработка событий при отправки формы, вызывает ф-цию добавления элемента

  function onSubmit(event) {
    event.preventDefault();

    if (label.trim()) props.addItem(label, Number(min), Number(sec));

    setLabel('');
    setMin('');
    setSec('');
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          onChange={onLabelChange}
          //Для установки связи со state
          value={label}
          name="label"
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          autoFocus
          onChange={onLabelChange}
          value={min}
          name="min"
          required
        />
        <input
          className="new-todo-form__timer"
          type="number"
          max={60}
          placeholder="Sec"
          autoFocus
          onChange={onLabelChange}
          value={sec}
          name="sec"
          required
        />
        <button type="submit" className="new-todo-form__btn"></button>
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default NewTaskForm;
