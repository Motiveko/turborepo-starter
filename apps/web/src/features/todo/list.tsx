import React from "react";
import { useTodoStore } from "@web/features/todo/use-todo-store";

export const TodoList: React.FC = () => {
  const { todos, loadingIds, removeTodo } = useTodoStore();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center gap-2">
          <span>{todo.text}</span>
          <button
            onClick={() => removeTodo(todo.id)}
            disabled={loadingIds.has(todo.id)}
            className="text-red-500 disabled:text-gray-300"
          >
            {loadingIds.has(todo.id) ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
};
