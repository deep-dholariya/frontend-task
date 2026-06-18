import axios from "axios";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-task/${task._id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${task._id}`
      );

      alert("Task Deleted Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/tasks/${task._id}/complete`
      );

      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold break-words">
          {task.title}
        </h2>

        <div className="flex gap-4 self-end sm:self-auto">
          {task.status !== "Completed" && (
            <button
              onClick={handleComplete}
              className="text-green-500 text-lg"
            >
              <FaCheck />
            </button>
          )}

          <button
            onClick={handleEdit}
            className="text-yellow-500 text-lg"
          >
            <FaEdit />
          </button>

          <button
            onClick={handleDelete}
            className="text-red-500 text-lg"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <p className="mb-3 text-sm sm:text-base break-words">
        {task.description}
      </p>

      <p className="mb-3 text-sm text-gray-600">
        Due Date:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "N/A"}
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm w-fit">
          {task.priority}
        </span>

        <span
          className={`px-3 py-1 rounded text-sm w-fit ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;