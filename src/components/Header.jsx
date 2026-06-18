import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          Task Manager
        </h1>

        <nav>
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 font-medium text-sm sm:text-base">
            <li>
              <Link to="/" className="hover:text-gray-200">
                Add Task
              </Link>
            </li>

            <li>
              <Link to="/view-tasks" className="hover:text-gray-200">
                View Tasks
              </Link>
            </li>

            {/* <li>
              <Link to="/edit-task" className="hover:text-gray-200">
                Edit Task
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
