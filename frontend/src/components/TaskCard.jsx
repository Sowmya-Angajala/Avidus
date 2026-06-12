// import "../styles/dashboard.css";

const TaskCard = ({
  task,
  onEdit,
  onDelete
}) => {
  return (
    <div className="task-card">

      <div className="task-header">
        <h3>{task.title}</h3>

        <span
          className={
            task.status === "Completed"
              ? "completed"
              : "pending"
          }
        >
          {task.status}
        </span>
      </div>

      <p>{task.description}</p>

      <div className="task-footer">

        <button
          className="edit-btn"
          onClick={() =>
            onEdit(task)
          }
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            onDelete(task._id)
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;