import { useState } from "react";

const TaskForm = ({
  onSubmit,
  initialData,
}) => {
  const [form, setForm] =
    useState(
      initialData || {
        title: "",
        description: "",
        status: "Pending",
      }
    );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form
      className="task-form"
      onSubmit={submit}
    >
      <h2>
        {initialData
          ? "Edit Task"
          : "Create New Task"}
      </h2>

      <input
        name="title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows="4"
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="Pending">
          Pending
        </option>

        <option value="Completed">
          Completed
        </option>
      </select>

      <button type="submit">
        {initialData
          ? "Update Task"
          : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;