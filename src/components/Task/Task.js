import './Task.css';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../Timer/Timer';


const Task = (props) => {
  const handleChange = (event) => {
    const { item, addEditedItem } = props;
    const newItem = { ...item };

    newItem.label = event.target.value;
    newItem.editing = false;

    addEditedItem(item.id, newItem);
  };

  const handleChangeKey = (event) => {
    if (event.key === 'Enter') {
      handleChange(event);
    }
  };

  const { onDeleted, onToggleEdit, onToggleDone, item, changeTimer } = props;
  const { label, dateСreation, completed, editing, timerData, id } = item;

  // превращем строку обатно в объект
  const dateObj = new Date(dateСreation);
  // возвращает строку с информацией сколько минут/секунд назад создан Task
  const wasCreated = formatDistanceToNow(dateObj, { includeSeconds: true }, { addSuffix: true });

  let className = '';

  if (completed) {
    className += ' completed';
  }

  if (editing) {
    className += ' editing';
  }

  return (
    <li className={className}>
      <div className="view">
        <input className='toggle' type="checkbox" checked={!!completed} onChange={onToggleDone} />
        <label>
          <span className="title">{label}</span>
          <Timer changeTimer={changeTimer} timerData={timerData} id={id} />
          <span className="created">created {wasCreated} ago</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={onToggleEdit} />
        <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={onDeleted} />
      </div>
      <input type="text" className="edit" defaultValue={label} onBlur={handleChange} onKeyPress={handleChangeKey} />
    </li>
  );
}



export default Task;
/*export default class Task extends Component {
  static propTypes = {
    item: PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      editing: PropTypes.bool,
      dateСreation: PropTypes.string,
      id: PropTypes.number,
      timerData: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number,
        intervalId: PropTypes.number,
      }),
    }).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
    addEditedItem: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    changeTimer: PropTypes.func.isRequired,
  };

  // обновляет label при потере фокуса с input
  handleChange = (event) => {
    const { item, addEditedItem } = this.props;
    const newItem = { ...item };

    newItem.label = event.target.value;
    newItem.editing = false;

    addEditedItem(item.id, newItem);
  };

  // обновляет label при нажатии Enter
  handleChangeKey = (event) => {
    if (event.key === 'Enter') {
      this.handleChange(event);
    }
  };

  render() {
    // console.log(Task.defaultProps)
    // console.log(this.props)

    const { onDeleted, onToggleEdit, onToggleDone, item, changeTimer } = this.props;
    const { label, dateСreation, completed, editing, timerData, id } = item;

    // превращем строку обатно в объект
    const dateObj = new Date(dateСreation);
    // возвращает строку с информацией сколько минут/секунд назад создан Task
    const wasCreated = formatDistanceToNow(dateObj, { includeSeconds: true }, { addSuffix: true });

    let className = '';

    if (completed) {
      className += ' completed';
    }

    if (editing) {
      className += ' editing';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className='toggle' type="checkbox" checked={!!completed} onChange={onToggleDone} />
          <label>
            <span className="title">{label}</span>
            <Timer changeTimer={changeTimer} timerData={timerData} id={id} />
            <span className="created">created {wasCreated} ago</span>
          </label>
          <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={onToggleEdit} />
          <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={onDeleted} />
        </div>
        <input type="text" className="edit" defaultValue={label} onBlur={this.handleChange} onKeyPress={this.handleChangeKey} />
      </li>
    );
  }
}*/