import React, { useState } from "react";
import { useStore } from "@web/stores/root-store";
import { addToast } from "@web/features/toast/toast-service";

export function TodoInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const addTodo = useStore((state) => state.todo.add);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      if (text === "123") throw new Error("zz");
      await addTodo(text);
      addToast({ message: "todo 추가를 완료했습니다.", type: "success" });
      setText("");
    } catch (error) {
      addToast({
        title: "❌ oops!",
        message: "todo 추가를 실패했습니다.",
        type: "error",
        action: {
          label: "retry",
          onClick: () => handleSubmit(e),
        },
      });
    } finally {
      setLoading(false);
    }
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
