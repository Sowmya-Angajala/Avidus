// src/pages/Home.jsx

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

      <nav className="home-navbar">
        <h2>TaskFlow</h2>

        <div style={{display:'flex',gap:'12px'}}>
          <Link to="/login">
            <button className="outline-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="primary-btn">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <section className="hero-section">

        <div className="hero-content">
          <h1>
            Manage Tasks Smarter,
            Not Harder
          </h1>

          <p>
            A role-based task management
            platform where users manage
            their work efficiently and
            administrators monitor
            activities, users and analytics.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="primary-btn">
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="outline-btn">
                Login
              </button>
            </Link>

          </div>

          <div className="hero-stats">
  <div>
    <h3>JWT Security</h3>
    <p>Secure authentication system</p>
  </div>

  <div>
    <h3>Role Based Access</h3>
    <p>Admin & User permissions</p>
  </div>

  <div>
    <h3>Analytics</h3>
    <p>Track task progress easily</p>
  </div>
</div>

          
          
        </div>

      </section>

      <section className="features">

        <h2>
          How It Works
        </h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Register</h3>
            <p>
              Create your account and
              securely access the platform.
            </p>
          </div>

          <div className="feature-card">
            <h3>Create Tasks</h3>
            <p>
              Add, update and organize
              tasks efficiently.
            </p>
          </div>

          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>
              Mark tasks completed and
              monitor productivity.
            </p>
          </div>

          <div className="feature-card">
            <h3>Admin Control</h3>
            <p>
              Manage users, tasks and
              monitor activities.
            </p>
          </div>

          <div className="feature-card">
            <h3>Activity Logs</h3>
            <p>
              Every important action is
              tracked and recorded.
            </p>
          </div>

          <div className="feature-card">
            <h3>Analytics</h3>
            <p>
              Get insights about users
              and task completion.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;