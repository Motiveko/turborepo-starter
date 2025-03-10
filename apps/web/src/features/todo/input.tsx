import React, { useState } from "react";
import { useTodoStore } from "@web/features/todo/use-todo-store";

export const TodoInput: React.FC = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    await addTodo(text);
    setText("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded"
        placeholder="Enter todo"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};
