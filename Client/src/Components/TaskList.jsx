import TaskCard from "./TaskCard";
import { FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

function TaskList({ title, tasks, handleFormView, handleOptionView }) {
  const handleClick = () => {
    handleFormView();
  };

  const handleShowOptions = (taskId) => {
    handleOptionView(taskId);
  };
  return (
    <div className="flex-1 bg-gray-100 rounded-xl">
      <div className="flex items-center justify-between mb-4 p-4 pb-0">
        <span className="flex gap-1">
          <GoDotFill
            className={`mt-2 ${
              title === "To Do"
                ? "text-blue-600"
                : title === "Done"
                ? " text-green-500"
                : " text-red-400"
            }`}
          />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </span>
        {title === "To Do" && (
          <button className="p-2 bg-blue-300 rounded-lg " onClick={handleClick}>
            <FaPlus className="text-blue-500" />
          </button>
        )}
      </div>
      <div
        className={`mx-4  h-[3px] text-sm px-2 rounded ${
          title === "To Do"
            ? "bg-blue-600"
            : title === "Done"
            ? " bg-green-500"
            : " bg-red-400"
        }`}
      ></div>

      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          type={title}
          {...task}
          taskId={task._id}
          handleShowOptions={handleShowOptions}
          handleFormView={handleFormView}
        />
      ))}
    </div>
  );
}
export default TaskList;
