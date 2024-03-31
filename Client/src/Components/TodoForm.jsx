import { useState } from "react";
import axios from "axios";

function TodoForm({ tasks, action }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("");
  const [submit, setSubmit] = useState("");

  const handleSubmit = async (e) => {
    const id = JSON.stringify(tasks._id);
    e.preventDefault();
    const newTodo = { title, body, priority };
    setSubmit(true);
    try {
      if (action !== "update") {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        });

        if (response.ok) {
          setTitle("");
          setBody("");
          setPriority("");
          window.location.href = "/";
        } else {
          console.error("Failed to add todo:", response.statusText);
        }
      }
      if (action === "update") {
        const taskData = await axios.get(
          `http://localhost:3000/gettasks/${id}`
        );
        const data = taskData.data;
        if (data) {
          const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
          });
          if (response.ok) {
            setTitle("");
            setBody("");
            setPriority("");
            window.location.href = "/";
          } else {
            console.error("Failed to update todo:", response.statusText);
          }
        } else {
          const response = await fetch(
            `http://localhost:3000/underProcessTask/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newTodo),
            }
          );
          if (response.ok) {
            setTitle("");
            setBody("");
            setPriority("");
            window.location.href = "/";
          } else {
            console.error("Failed to update todo:", response.statusText);
          }
        }
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-slate-200 px-6 rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="priority"
          className="block text-sm font-bold text-gray-700"
        >
          Priority:
        </label>
        <input
          type="text"
          id="title"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-bold text-gray-700"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-sm font-bold text-gray-700">
          Body:
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows="4"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none "
        />
      </div>
      <button
        type="submit"
        disabled={submit}
        className=" mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600  focus:outline-none"
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
