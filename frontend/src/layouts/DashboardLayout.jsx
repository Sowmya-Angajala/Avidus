import { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mobile-nav">
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      <div className="layout">
        <div
          className={`sidebar-wrapper ${
            open ? "open" : ""
          }`}
        >
          <Sidebar />
        </div>

        <main className="content">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;