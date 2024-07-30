import { useState } from "react";
import Button from "./Button";
import Form from "./Form";

const initialTasks = [
  { id: 1, taskName: "Do this", taskStatus: false },
  { id: 2, taskName: "Do that", taskStatus: false },
  { id: 3, taskName: "Do something", taskStatus: false },
];

export default function Tasks() {
  const [taskList, setTaskList] = useState(initialTasks);
  function handleSetTask(newTask) {
    setTaskList((curTasks) => [...curTasks, newTask]);
  }
  function handleDeleteTask(id) {
    setTaskList((currList) => currList.filter((task) => task.id !== id));
  }
  function handleCheckTask(id) {
    setTaskList((currList) =>
      currList.map((task) =>
        task.id === id ? { ...task, taskStatus: !task.taskStatus } : task
      )
    );
  }
  return (
    <div className="container">
      <CreateTask onSetTask={handleSetTask} />
      <DisplayTaskList
        taskList={taskList}
        onDeleteTask={handleDeleteTask}
        onCheckTask={handleCheckTask}
      />
    </div>
  );
}

function CreateTask({ onSetTask }) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName === "") return;
    const newTask = { id: crypto.randomUUID(), taskName };
    onSetTask(newTask);
  }
  return (
    <Form btnName="Add Task" onSubmit={handleSubmit} formName="Create new task">
      {" "}
      <label>Task name:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
    </Form>
  );
}

function DisplayTaskList({ taskList, onDeleteTask, onCheckTask }) {
  return (
    <div className="subcontainer">
      <h3>TASKS</h3>
      <ul>
        {taskList.map((task) => (
          <li className="displayListItem" key={task.id}>
            <input
              type="checkbox"
              value={task.taskStatus}
              onChange={() => onCheckTask(task.id)}
              style={{ height: "25px", width: "20%", display: "inline" }}
            />
            <h4
              style={task.taskStatus ? { textDecoration: "line-through" } : {}}
            >
              {task.taskName}
            </h4>{" "}
            <Button
              addonClass="btn-small btn-alone"
              value={task.id}
              onClick={onDeleteTask}
            >
              Delete Task
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
