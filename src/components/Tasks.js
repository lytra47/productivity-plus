import { useEffect, useState } from "react";
import Button from "./Button";
import Form from "./Form";

const initialTasks = [
  { id: 1, taskName: "Do this", taskStatus: false },
  { id: 2, taskName: "Do that", taskStatus: false },
  { id: 3, taskName: "Do something", taskStatus: false },
];

export default function Tasks() {
  const [taskList, setTaskList] = useState(initialTasks);
  const [editSelect, setEditSelect] = useState(null);

  function handleSetTask(newTask) {
    setTaskList((curTasks) => [...curTasks, newTask]);
  }
  function handleDeleteTask(id) {
    handleCancelEdit();
    setTaskList((currList) => currList.filter((task) => task.id !== id));
  }
  function handleCheckTask(id) {
    setTaskList((currList) =>
      currList.map((task) =>
        task.id === id ? { ...task, taskStatus: !task.taskStatus } : task
      )
    );
  }
  function handleUpdateTask(updatedTask) {
    setTaskList((currList) =>
      currList.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }
  function handleSetEditTask(id) {
    setEditSelect(id);
  }
  function handleCancelEdit() {
    setEditSelect(null);
  }

  return (
    <div className="container">
      {editSelect ? (
        <EditTask
          key={editSelect}
          editSelect={editSelect}
          onCancelEdit={handleCancelEdit}
          taskList={taskList}
          onUpdateTask={handleUpdateTask}
        />
      ) : (
        <CreateTask onSetTask={handleSetTask} taskList={taskList} />
      )}
      <DisplayTaskList
        taskList={taskList}
        onDeleteTask={handleDeleteTask}
        onCheckTask={handleCheckTask}
        onEditTask={handleSetEditTask}
      />
    </div>
  );
}

function CreateTask({ onSetTask }) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName === "") return;
    const newTask = { id: Date.now(), taskName };

    onSetTask(newTask);
    setTaskName("");
  }
  return (
    <Form onSubmit={handleSubmit} formName="Create new task">
      {" "}
      <label>Task name:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit" className="button btn-alone">
        Add Task
      </button>
    </Form>
  );
}

function EditTask({ taskList, editSelect, onCancelEdit, onUpdateTask }) {
  const [editedTask, setEditedTask] = useState("");

  useEffect(
    function () {
      setEditedTask(taskList.find((task) => task.id === editSelect).taskName);
    },
    [taskList, editSelect]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (editedTask === "") return;
    const taskStatus = taskList.find(
      (task) => task.id === editSelect
    ).taskStatus;
    const updatedTask = { id: editSelect, taskName: editedTask, taskStatus };
    onUpdateTask(updatedTask);

    onCancelEdit();
    setEditedTask("");
  }
  return (
    <Form onSubmit={handleSubmit} formName={`Edit task ${editSelect}`}>
      {" "}
      <label>Edit task name:</label>
      <input
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
      />
      <button type="submit" className="button btn-left">
        Update Task
      </button>
      <button
        className="button btn-right"
        onClick={(e) => {
          e.preventDefault();
          onCancelEdit();
        }}
      >
        Cancel
      </button>
    </Form>
  );
}

function DisplayTaskList({ taskList, onDeleteTask, onCheckTask, onEditTask }) {
  return (
    <div className="subcontainer">
      <h3>TASKS</h3>
      <ul>
        {taskList.map((task) => (
          <li className="displayListItem" key={task.id}>
            <input
              type="checkbox"
              style={{ width: "10%" }}
              value={task.taskStatus}
              onChange={() => onCheckTask(task.id)}
            />
            <p
              className="task-text"
              style={task.taskStatus ? { textDecoration: "line-through" } : {}}
            >
              {task.taskName}
            </p>
            <Button
              addonClass="btn-small btn-left btn-task"
              onClick={() => onEditTask(task.id)}
            >
              ↻
            </Button>
            <Button
              addonClass="btn-small btn-right btn-task"
              onClick={() => onDeleteTask(task.id)}
            >
              ×
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
