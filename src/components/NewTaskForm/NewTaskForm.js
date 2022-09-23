import React, { useState } from 'react';
import './NewTaskForm.css';



const NewTaskForm = (props) => {
  const [label , setLabel] = useState('');

  const onLabelChange = (event) => {
    setLabel(event.target.value)
  };

  const onSubmit = (event) => {
    if (label.trim().length === 0) {
      return alert('type smth')
    }
    event.preventDefault();

    props.onSubmit(label);
    setLabel('');
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
    </form>
  )
}

export default NewTaskForm;