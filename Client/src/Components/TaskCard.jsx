import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Options from "./Options";

function TaskCard({
  _id,
  title,
  body,
  priority,
  taskId,
  handleFormView,
  type,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div className="rounded-lg border bg-white m-5  shadow-sm mb-4 relative ">
      {showOptions && (
        <div className="absolute top-10 right-0 w-50 h-20">
          <Options
            type={type}
            taskId={taskId}
            _id={_id}
            handleFormView={handleFormView}
          />
        </div>
      )}
      <div className="flex justify-between  p-4">
        <div
          className={`p-1 text-sm px-2 rounded ${
            priority === "Low"
              ? "text-orange-500  bg-orange-100 "
              : priority === "Completed"
              ? "bg-green-100 text-green-500"
              : "text-red-500  bg-red-100 "
          }`}
        >
          {priority}
        </div>
        <BsThreeDots className="mt-2 " onClick={handleClick} />
      </div>
      <div className="p-6 pt-0">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-sm text-gray-600">{body}</p>
      </div>
    </div>
  );
}

export default TaskCard;
