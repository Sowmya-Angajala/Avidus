import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Task Manager</h2>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/tasks">
        My Tasks
      </Link>

      {user?.role === "Admin" && (
        <>
          <Link to="/admin/users">
            Users
          </Link>

          <Link to="/admin/tasks">
            Tasks
          </Link>

          <Link to="/admin/logs">
            Logs
          </Link>

          <Link to="/analytics">
            Analytics
          </Link>
        </>
      )}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;