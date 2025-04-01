import React, { useState } from "react";
import { useTodoStore } from "@web/features/todo/use-todo-store";

export function TodoInput() {
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
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        className="border p-2 rounded"
        disabled={loading}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Enter todo"
        value={text}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
        type="submit"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
