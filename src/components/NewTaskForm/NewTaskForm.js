import React from "react";
import PropTypes from "prop-types";

import "./NewTaskForm.css";

class NewTaskForm extends React.Component {
  state = {
    label: "",
    min: "",
    sec: "",
  };

  //Изменяет состояние label при вводе текста в input

  onLabelChange = event => {
    const target = event.target;

    this.setState({
      [target.name]: target.value,
    });
  };

  //Обработка событий при отправки формы, вызывает ф-цию добавления элемента

  onSubmit = event => {
    const { label, min, sec } = this.state;

    event.preventDefault();

    if (this.state.label.trim()) this.props.addItem(label, Number(min), Number(sec));

    this.setState({
      label: "",
      min: "",
      sec: "",
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="Task"
            autoFocus
            onChange={this.onLabelChange}
            //Для установки связи со state
            value={this.state.label}
            name="label"
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.min}
            name="min"
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.sec}
            name="sec"
            required
          />
          <button type="submit" className="new-todo-form__btn"></button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default NewTaskForm;
