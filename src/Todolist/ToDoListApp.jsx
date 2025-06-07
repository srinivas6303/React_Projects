import React, { useState } from 'react';
import './ToDoListApp.css'; // Make sure this file exists

function ToDoListApp() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const [deleteList, setDeletedList] = useState([]);

  function handleTaskInputChange(e) {
    setTask(e.target.value);
  }

  function handleAddTask() {
    if (task.trim() !== '') {
      setList([...list, task]);
      setTask('');
    }
  }

  function handleSoftDeleteTask(index) {
    const deletedItem = list[index];
    setDeletedList([...deleteList, deletedItem]);
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  }

  function handlePermanentDeleteFromTrash(index) {
    const newDeletedList = deleteList.filter((_, i) => i !== index);
    setDeletedList(newDeletedList);
  }

  function handleRestoreTask(index) {
    const restoredTask = deleteList[index];
    setList([...list, restoredTask]);
    const newDeletedList = deleteList.filter((_, i) => i !== index);
    setDeletedList(newDeletedList);
  }

  function handlePermanentDeleteFromList(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  }

  return (
    <div className="app-container">
      <h1 className="title">📝 To-Do List App</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          placeholder="Enter your task"
          onChange={handleTaskInputChange}
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-btn">ADD</button>
      </div>

      <div className="list-section">
        <h2>Active Tasks</h2>
        <ul>
          {list.map((item, index) => (
            <li key={index} className="task-item">
              {item}
              <button onClick={() => handlePermanentDeleteFromList(index)} className="btn delete-btn">PDelete</button>
              <button onClick={() => handleSoftDeleteTask(index)} className="btn soft-delete-btn">TDelete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="list-section deleted-section">
        <h2>Trash (Temp. Deleted Tasks)</h2>
        <ul>
          {deleteList.map((item, index) => (
            <li key={index} className="task-item deleted">
              {item}
              <button onClick={() => handleRestoreTask(index)} className="btn restore-btn">Restore</button>
              <button onClick={() => handlePermanentDeleteFromTrash(index)} className="btn delete-btn">PDelete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoListApp;
