import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    const loadTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks?id=${id}`
        );

        const task = response.data;

        setFormData({
          title: task.title || "",
          description: task.description || "",
          priority: task.priority || "Medium",
          dueDate: task.dueDate
            ? task.dueDate.split("T")[0]
            : "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      loadTask();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        formData
      );

      alert("Task Updated Successfully");
      navigate("/view-tasks");
    } catch (error) {
      console.log(error);
      alert("Failed To Update Task");
    }
  };

  return (
  <div className="max-w-2xl mx-auto mt-6 sm:mt-10 px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-xl shadow"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-5">
        Edit Task
      </h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="w-full border p-3 rounded mb-3 text-sm sm:text-base"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Task Description"
        rows="4"
        className="w-full border p-3 rounded mb-3 text-sm sm:text-base"
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
        className="w-full sm:w-auto bg-yellow-500 text-white px-5 py-3 rounded hover:bg-yellow-600"
      >
        Update Task
      </button>
    </form>
  </div>
);
}

export default EditTask;

