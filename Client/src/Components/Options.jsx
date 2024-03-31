import { MdDelete } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import axios from "axios";
import TodoForm from "./TodoForm";
import { useState } from "react";
import { TbArrowMoveRight } from "react-icons/tb";
import { TbArrowMoveLeft } from "react-icons/tb";

const Options = ({ _id, type }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const id = JSON.stringify(_id);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
    } catch (error) {
      try {
        await axios.delete(`http://localhost:3000/underProcessTask/${id}`);
        window.location.href = "/";
      } catch (error) {
        try {
          await axios.delete(`http://localhost:3000/completedTask/${id}`);
          window.location.href = "/";
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }
    }
  };

  const handleUpdate = async () => {
    setShowUpdate(!showUpdate);
  };

  const handleMove = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/gettasks/${id}`);
      const data = response.data;
      console.log(data);
      if (data) {
        await axios.post("http://localhost:3000/underProcessTask", data);
        await axios.delete(`http://localhost:3000/tasks/${id}`);
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/underProcessTask/${id}`
      );
      const data = response.data;
      console.log(data);
      if (data) {
        await axios.post("http://localhost:3000/completedTask", data);
        await axios.delete(`http://localhost:3000/underProcessTask/${id}`);
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const update = "update";

  return (
    <div className="flex gap-2 rounded bg-gray-300 p-2">
      {showUpdate && (
        <div className="fixed top-0 right-1/2 tranform  translate-x-[150px] w-[300px] z-10">
          <TodoForm tasks={task} action={update} />
        </div>
      )}
      <MdDelete onClick={handleDelete} />
      {type !== "Done" && <TfiWrite onClick={handleUpdate} />}
      {type === "To Do" && <TbArrowMoveRight onClick={handleMove} />}
      {type === "On Progress" && <TbArrowMoveRight onClick={handleComplete} />}
    </div>
  );
};

export default Options;
