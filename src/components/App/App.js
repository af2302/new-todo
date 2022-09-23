import React, { useState } from 'react';
import './App.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

const App = () => {
  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem('todoData')) || [])
  const [filter, setFilter] = useState(JSON.parse(localStorage.getItem('filter')) || 'all')


  const addItem = (text) => {
    const newItem = createTodoItem(text);
    const newArr = [newItem, ...todoData];
    setTodoData(newArr);
  }

  const createTodoItem = (label) => {
    const str = String(new Date());
    return {
      label,
      completed: false,
      editing: false,
      dateСreation: str,
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      timerData: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        intervalId: 0,
      },
    };
  }

  const deleteItem = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const newArr = todoData.filter((_, ind) => ind !== index);
    setTodoData(newArr);
  }

  const onToggleDone = (id) => {
    setTodoData(toggleProperties(todoData, id, 'completed'));
  };

  const onToggleEdit = (id) => {
    setTodoData(toggleProperties(todoData, id, 'editing'))
  };

  const toggleProperties = (arr, id, propertyName) => {
    const ind = arr.findIndex((el) => el.id === id);
    const newArr = [...arr];
    newArr[ind][propertyName] = !newArr[ind][propertyName];
    return newArr;
  };

  const addEditedItem = (id, updateItem) => {
    const newArr = [...todoData];
    const ind = newArr.findIndex((el) => el.id === id);
    newArr[ind] = updateItem;
    setTodoData(newArr);
  };

  const onFilterChange = (filterName) => {
    setFilter(filterName)
  };

  const clearCompleted = () => {
    setTodoData([...todoData].filter((item) => !item.completed));
  };

  const changeTimer = (id, updatTimerData) => {
    const newArr = [...todoData];
    const ind = newArr.findIndex((el) => el.id === id);
    newArr[ind].timerData = updatTimerData;
    // console.log(newArr[ind].timerData)
    setTodoData(newArr);
  };

  const filters = (arr, filter) => {
    switch (filter) {
    case 'all':
      return arr;
    case 'completed':
      return arr.filter((item) => item.completed);
    case 'active':
      return arr.filter((item) => !item.completed);
    default:
      return arr;
    }
  };

  // счетчик невыполненных задач
  const tasksLeftCount = todoData.filter((el) => !el.completed).length;
  // отфильтрованные элементы
  const filtersItems = filters(todoData, filter);
  // изменяет localStorage
  localStorage.setItem('todoData', JSON.stringify(todoData));
  localStorage.setItem('filter', JSON.stringify(filter));

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onSubmit={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={filtersItems}
          onToggleDone={onToggleDone}
          onDeleted={deleteItem}
          onToggleEdit={onToggleEdit}
          addEditedItem={addEditedItem}
          changeTimer={changeTimer}
        />
      </section>
      <Footer
        taskCount={tasksLeftCount}
        itemStatusFilter={filter}
        onFilterChange={onFilterChange}
        clearCompleted={clearCompleted}
      />

    </section>
  );
}

export default App;