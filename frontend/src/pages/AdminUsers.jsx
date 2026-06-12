import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

const AdminUsers = () => {

  const [users, setUsers] =
    useState([]);

  const fetchUsers =
    async () => {

      const res =
        await API.get(
          "/admin/users"
        );

      setUsers(res.data);
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser =
    async (id) => {

      if (
        !window.confirm(
          "Delete User?"
        )
      )
        return;

      await API.delete(
        `/admin/users/${id}`
      );

      fetchUsers();
    };

  const updateStatus =
    async (
      id,
      status
    ) => {

      await API.patch(
        `/admin/users/${id}/status`,
        { status }
      );

      fetchUsers();
    };

  return (
    <DashboardLayout>

      <h2>User Management</h2>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {users.map(user => (

              <tr key={user._id}>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>
                  {user.status}
                </td>

                <td>

                  <button
                    className="status-btn"
                    onClick={() =>
                      updateStatus(
                        user._id,
                        user.status ===
                          "Active"
                          ? "Inactive"
                          : "Active"
                      )
                    }
                  >
                    Toggle
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteUser(
                        user._id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default AdminUsers;