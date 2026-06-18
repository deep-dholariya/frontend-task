import { useState } from "react";
import axios from "axios";

function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://task-manager-backend-1bka.onrender.com/api/tasks",
        formData
      );

      console.log(res.data);

      alert("Task Added Successfully");

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      window.location.reload();
    } catch (error) {
      console.log(error);

      alert("Failed To Add Task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Add New Task</h2>

      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3 text-sm sm:text-base"
        required
      />

      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3 text-sm sm:text-base"
        rows="4"
        required
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-3 text-sm sm:text-base"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4 text-sm sm:text-base"
      />

      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;