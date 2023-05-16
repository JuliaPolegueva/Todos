import React from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

class App extends React.Component {
  state = {
    todoData: [],
    filter: 'All',
    timer: false,
  };

  //Создание элементов

  createItem(label, min, sec) {
    return {
      id: this.state.todoData.length + 1,
      body: label,
      min: min,
      sec: sec,
      date: new Date(),
      checked: false,
    };
  }

  //Добавление элементов

  addItem = (text, min, sec) => {
    const newItem = this.createItem(text, min, sec);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  //Удаление элементов

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  //Выполнение элементов

  checkItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, checked: !oldItem.checked };

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  //Редактирование элемента

  editItem = (id, label) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, body: label };

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  //Фильтрование элементов

  filteredItems = () => {
    const { todoData, filter } = this.state;

    return todoData.filter(({ checked }) => {
      return filter === 'All' ? true : filter === 'Completed' ? checked === true : checked === false;
    });
  };

  //Изменение state фильтра

  changeFilter = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };

  //Очистка завершенных задач

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter(el => !el.checked);

      return {
        todoData: newArr,
      };
    });
  };

  static stopTimer;

  countdownTime = (id, min, sec) => {
    let startTime = Math.floor(min * 60 + sec);

    if (startTime <= 0) return;
    //уменьшаем общее время на одну секунду
    startTime--;

    const newMin = Math.floor(startTime / 60);
    const newSec = startTime % 60;

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, min: newMin, sec: newSec };

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArr,
        timer: true,
      };
    });

    //смотрим время не закончилось
    if (startTime >= 1) {
      //если нет, то повторяем процедуру заново
      this.stopTimer = setTimeout(() => {
        this.countdownTime(id, newMin, newSec);
      }, 1000);
      //если закончилось, то выводим сообщение на экран, и делаем кнопку запуска активной
    } else {
      clearTimeout(this.stopTimer);
      this.setState(() => {
        return {
          timer: false,
        };
      });
    }
  };

  stopTime = () => {
    //очистим переменную с таймером
    clearTimeout(this.stopTimer);
    this.setState(() => {
      return {
        timer: false,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={this.filteredItems()}
            deleteItem={this.deleteItem}
            checkItem={this.checkItem}
            editItem={this.editItem}
            countdownTime={this.countdownTime}
            stopTime={this.stopTime}
            timer={this.state.timer}
          />
          <Footer
            lefts={this.state.todoData.filter(item => !item.checked).length}
            changeFilter={this.changeFilter}
            clearCompleted={this.clearCompleted}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}

export default App;
