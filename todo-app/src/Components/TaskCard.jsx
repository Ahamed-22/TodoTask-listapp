export default function TaskCard({
  task = {},
  handleDeleteTask = () => {},
  handleTaskCompleted = () => {},
  handleTaskNotCompleted = () => {},
  handleEditTask=()=>{}
}) {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-4 my-3 card" style={{ width: "23rem" , backgroundColor : 'lightgreen' }}>
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 my-3">
            <h6 className="mb-0">Name :</h6>
            <p className="mb-0">{task.task}</p>
          </div>
          <div className="d-flex align-items-center gap-3 my-3">
            <h6 className="mb-0">Description :</h6>
            <p className="mb-0">{task.description}</p>
          </div>
          {/* Status Section */}
          <div className="d-flex align-items-center gap-3 my-3">
            <h6 className="mb-0">Status :</h6>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: task.completed ? "green" : "red" }}
              >
                {task.completed ? "Completed" : "Not Completed"}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li onClick={() => handleTaskCompleted(task.id)}>
                  <a className="dropdown-item" href="#">
                    Completed
                  </a>
                </li>
                <li onClick={() => handleTaskNotCompleted(task.id)}>
                  <a className="dropdown-item" href="#">
                    Not Completed
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Button group */}
          <div
            className="col d-flex justify-content-end mt-4"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button type="button" className="btn btn-success me-2" onClick={() => handleEditTask(task.id)}>
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
