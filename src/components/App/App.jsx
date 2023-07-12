import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('All');

  //Создание элементов

  function createItem(label, min, sec) {
    return {
      id: todoData.length + 1,
      body: label,
      min: min,
      sec: sec,
      date: new Date(),
      checked: false,
    };
  }

  //Добавление элементов

  function addItem(text, min, sec) {
    const newItem = createItem(text, min, sec);
    const newArr = [...todoData, newItem];

    setTodoData(newArr);
  }

  //Удаление элементов

  function deleteItem(id) {
    const idx = todoData.findIndex(el => el.id === id);
    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

    setTodoData(newArr);
  }

  //Выполнение элементов

  function checkItem(id) {
    const idx = todoData.findIndex(el => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, checked: !oldItem.checked };
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

    setTodoData(newArr);
  }

  //Редактирование элемента

  function editItem(id, label) {
    const idx = todoData.findIndex(el => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, body: label };
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

    setTodoData(newArr);
  }

  //Фильтрование элементов

  function filteredItems() {
    return todoData.filter(({ checked }) => {
      return filter === 'All' ? true : filter === 'Completed' ? checked === true : checked === false;
    });
  }

  //Изменение state фильтра

  function changeFilter(newFilter) {
    setFilter(newFilter);
  }

  //Очистка завершенных задач

  function clearCompleted() {
    const newArr = todoData.filter(el => !el.checked);

    setTodoData(newArr);
  }

  function timerUpdate(id, min, sec) {
    const idx = todoData.findIndex(el => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, min: min, sec: sec };
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

    setTodoData(newArr);
  }

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          todos={filteredItems()}
          deleteItem={deleteItem}
          checkItem={checkItem}
          editItem={editItem}
          timerUpdate={timerUpdate}
        />
        <Footer
          lefts={todoData.filter(item => !item.checked).length}
          changeFilter={changeFilter}
          clearCompleted={clearCompleted}
          filter={filter}
        />
      </section>
    </section>
  );
}

export default App;
