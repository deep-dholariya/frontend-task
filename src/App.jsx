import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>

        <Route path="/" element={<TaskForm />} />

        <Route path="/view-tasks" element={<TaskList />} />

        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
