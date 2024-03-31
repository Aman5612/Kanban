import { useEffect, useState } from "react";
import TaskList from "./Components/TaskList";
import TodoForm from "./Components/TodoForm";
import axios from "axios";

function App() {
  const [create, setCreate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [underProcessTasks, setUnderProcessTasks] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [doneTasks, setDoneTasks] = useState([]);

  // const todoTasks = [
  //   {
  //     priority: "Low",
  //     title: "Brainstorming",
  //     description:
  //       "Brainstorming brings team members' diverse experience into play.",
  //   },
  //   {
  //     priority: "High",
  //     title: "Research",
  //     description: "User research helps you to create an optimal solution.",
  //   },
  //   {
  //     priority: "High",
  //     title: "Wireframes",
  //     description:
  //       "Low fidelity wireframes include the basic layout and structure of the interface.",
  //   },
  // ];

  // const onProgressTasks = [
  //   {
  //     priority: "Low",
  //     title: "Onboarding Illustrations",
  //     description: "Illustrations for onboarding screens.",
  //   },
  //   {
  //     priority: "Low",
  //     title: "Moodboard",
  //     description: "Moodboards visually convey the feel and tone of a project.",
  //   },
  //   {
  //     priority: "Low",
  //     title: "Refactoring",
  //     description:
  //       "Improving the codebase without changing its external behavior.",
  //   },
  // ];

  // const doneTasks = [
  //   {
  //     priority: "Completed",
  //     title: "Mobile App UI Design",
  //     description: "Designing the user interface for a mobile application.",
  //   },
  //   {
  //     priority: "Completed",
  //     title: "iOS App Design",
  //     description: "Designing the user interface for an iOS application.",
  //   },
  //   {
  //     priority: "Completed",
  //     title: "Design System",
  //     description: "It just needs to adapt the UI from what you did before.",
  //   },
  // ];

  const handleFormView = () => {
    setCreate(!create);
  };
  const handleOptionView = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/gettasks");
      const response2 = await axios.get(
        "http://localhost:3000/underProcessTasks"
      );
      const response3 = await axios.get("http://localhost:3000/completedTasks");
      setTasks(response.data);
      setUnderProcessTasks(response2.data);
      setDoneTasks(response3.data);

      console.log("Tasks:", response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg flex space-x-6 relative">
      {create && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-50 h-20 z-10">
          <TodoForm tasks={[]} action={"create"} />
        </div>
      )}

      <TaskList
        title="To Do"
        tasks={tasks}
        handleFormView={handleFormView}
        handleOptionView={handleOptionView}
      />
      <TaskList
        title="On Progress"
        tasks={underProcessTasks}
        handleOptionView={handleOptionView}
      />
      <TaskList
        title="Done"
        tasks={doneTasks}
        handleOptionView={handleOptionView}
      />
    </div>
  );
}

export default App;
