import {
  useState,
  useEffect,
} from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import TaskCard from "../components/TaskCard";

import TaskForm from "../components/TaskForm";

import Pagination from "../components/Pagination";

import Modal from "../components/Modal";

import {
  useToast,
} from "../context/ToastContext";

const MyTasks = () => {

  const { showToast } =
    useToast();

  const [tasks, setTasks] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [editingTask,
    setEditingTask] =
    useState(null);

  const [showForm,
    setShowForm] =
    useState(false);

  const [totalPages,
    setTotalPages] =
    useState(1);

  useEffect(() => {
    fetchTasks();
  }, [page, search, status]);

  const fetchTasks =
    async () => {

      try {

        const res =
          await API.get(
            `/tasks?page=${page}&search=${search}&status=${status}`
          );

        setTasks(
          res.data.tasks
        );

        setTotalPages(
          res.data.totalPages
        );

      } catch (err) {

        showToast(
          "error",
          "Failed to load tasks"
        );

      }
    };

  const createTask =
    async (data) => {

      try {

        await API.post(
          "/tasks",
          data
        );

        showToast(
          "success",
          "Task created successfully"
        );

        setShowForm(false);

        fetchTasks();

      } catch (err) {

        showToast(
          "error",
          err.response?.data?.message ||
          "Failed to create task"
        );

      }
    };

  const updateTask =
    async (data) => {

      try {

        await API.put(
          `/tasks/${editingTask._id}`,
          data
        );

        showToast(
          "success",
          "Task updated successfully"
        );

        setEditingTask(
          null
        );

        fetchTasks();

      } catch (err) {

        showToast(
          "error",
          err.response?.data?.message ||
          "Failed to update task"
        );

      }
    };

  const deleteTask =
    async (id) => {

      if (
        !window.confirm(
          "Delete Task?"
        )
      )
        return;

      try {

        await API.delete(
          `/tasks/${id}`
        );

        showToast(
          "success",
          "Task deleted successfully"
        );

        fetchTasks();

      } catch (err) {

        showToast(
          "error",
          err.response?.data?.message ||
          "Failed to delete task"
        );

      }
    };

  return (
    <DashboardLayout>

      <div className="task-toolbar">

        <input
          type="text"
          placeholder="Search Task"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
        >

          <option value="">
            All Tasks
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

        <button
          className="add-task-btn"
          onClick={() =>
            setShowForm(true)
          }
        >
          + Add Task
        </button>

      </div>

      <div className="tasks-container">

        <div className="task-grid">

          {tasks.map((task) => (

            <TaskCard
              key={task._id}
              task={task}
              onEdit={
                setEditingTask
              }
              onDelete={
                deleteTask
              }
            />

          ))}

        </div>

        <div className="pagination-wrapper">

          <Pagination
            currentPage={page}
            totalPages={
              totalPages
            }
            setPage={setPage}
          />

        </div>

      </div>

      {showForm && (

        <Modal
          onClose={() =>
            setShowForm(false)
          }
        >

          <TaskForm
            onSubmit={
              createTask
            }
          />

        </Modal>

      )}

      {editingTask && (

        <Modal
          onClose={() =>
            setEditingTask(null)
          }
        >

          <TaskForm
            initialData={
              editingTask
            }
            onSubmit={
              updateTask
            }
          />

        </Modal>

      )}

    </DashboardLayout>
  );
};

export default MyTasks;