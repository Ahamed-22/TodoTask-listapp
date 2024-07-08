import { useState } from "react";
import TaskCard from "./TaskCard";

export default function Todoform() {
  const [taskId, setTaskId] = useState(1);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleTasksSubmit = () => {
    if (editMode) {
      handleEditTaskSubmit();
      return;
    }
    const tasksCopy = [...tasks];
    tasksCopy.push({
      id: taskId,
      task: task,
      description: description,
      completed: false,
    });
    setTaskId(taskId + 1);
    setTasks(tasksCopy);
    setTask("");
    setDescription("");
  };

  const handleDeleteTask = (id = 0) => {
    let tasksCopy = [...tasks];
    tasksCopy = tasksCopy.filter((task) => task.id !== id);
    setTasks(tasksCopy);
  };

  const handleTaskCompleted = (id = 0) => {
    let tasksCopy = [...tasks];
    let fillterdTask = tasksCopy.filter((task) => task.id === id)[0];
    fillterdTask.completed = true;
    setTasks(tasksCopy);
  };

  const handleTaskNotCompleted = (id = 0) => {
    let tasksCopy = [...tasks];
    let fillterdTask = tasksCopy.filter((task) => task.id === id)[0];
    fillterdTask.completed = false;
    setTasks(tasksCopy);
  };

  const handleCompletedTask = () => {
    setFilter("Completed");
  };

  const handleAllTasks = () => {
    setFilter("All");
  };

  // Todo list edit

  const handleEditTask = (taskId) => {
    setEditMode(true);
    setEditTaskId(taskId);
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setEditTask(taskToEdit.task);
      setEditDescription(taskToEdit.description);
    }
  };
  

  const handleEditTaskSubmit = () => {
    const tasksCopy = [...tasks];
    const index = tasksCopy.findIndex((task) => task.id === editTaskId);
  
    if (index !== -1) {
      tasksCopy[index] = {
        ...tasksCopy[index],
        task: editTask,
        description: editDescription,
      };
      setTasks(tasksCopy);
    } else {
      console.error(`Task with id ${editTaskId} not found`);
    }
  
    setEditMode(false);
    setEditTaskId(null);
    setEditTask("");
    setEditDescription("");
  };
  

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.completed);

  return (
    <div className="container-fluid my-5">
      {/* form section */}
      <div className="row d-flex align-items-center justify-content-center">
        <h3 className="text-center">My Todo</h3>
        <div className="col-sm-4 col-xs-12 my-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Todo Name"
            value={editMode ? editTask : task}
            onChange={(e) => {
              editMode ? setEditTask(e.target.value) : setTask(e.target.value);
            }}
          />
        </div>
        <div className="col-sm-4 col-xs-12 my-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Todo Description"
            value={editMode ? editDescription : description}
            onChange={(e) => {
              editMode
                ? setEditDescription(e.target.value)
                : setDescription(e.target.value);
            }}
          />
        </div>
        <button
          className="col-sm-3 col-xs-12 btn btn-success"
          onClick={handleTasksSubmit}
        >
          {editMode ? "Update Todo" : "Add Todo"}
        </button>
      </div>
      {/* Task Cards */}
      <div className="row">
        <div className="col-sm-12 d-flex align-items-center justify-content-between my-4 px-4">
          <h5>My Todos</h5>
          <div className="dropdown d-flex align-items-center gap-3">
            <h5>Status Filter :</h5>
            <button
              className="btn dropdown-toggle mb-2"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                backgroundColor: filter === "Completed" ? "green" : "red",
              }}
            >
              {filter}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li onClick={handleAllTasks}>
                <a className="dropdown-item" href="#">
                  All
                </a>
              </li>
              <li onClick={handleCompletedTask}>
                <a className="dropdown-item" href="#">
                  Completed
                </a>
              </li>
            </ul>
          </div>
        </div>
        {filteredTasks.map((task, index) => (
          <div className="col-xl-4 col-md-6 d-flex align-items-center justify-content-center">
            <TaskCard
              key={index}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleTaskCompleted={handleTaskCompleted}
              handleTaskNotCompleted={handleTaskNotCompleted}
              handleEditTask={handleEditTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
