import React from "react";
import { useTodoStore } from "@web/features/todo/use-todo-store";

export const TodoList: React.FC = () => {
  const { todos, loadingIds, removeTodo } = useTodoStore();

  return (
    <ul>
      {todos.map((todo) => (
        <li className="flex items-center gap-2" key={todo.id}>
          <span>{todo.text}</span>
          <button
            className="text-red-500 disabled:text-gray-300"
            disabled={loadingIds.has(todo.id)}
            onClick={() => removeTodo(todo.id)}
          >
            {loadingIds.has(todo.id) ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
};
