import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/tasks?priority=${priority}&status=${status}`,
        );

        setTasks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, [priority, status]);

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Filter Tasks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium text-sm sm:text-base">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border p-3 rounded text-sm sm:text-base"
            >
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-sm sm:text-base">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-3 rounded text-sm sm:text-base"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        ) : (
          <p className="text-center md:text-left">No Tasks Found</p>
        )}
      </div>
    </>
  );
}

export default TaskList;
