import type { Todo } from "@repo/interfaces";

interface TodoItemProps {
  todo: Todo;
  isLoading: boolean;
  onDelete: (id: Todo["id"]) => any;
}

export function TodoItem({ todo, isLoading, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2" key={todo.id}>
      <span>{todo.title}</span>
      <button
        className="text-red-500 disabled:text-gray-300"
        disabled={isLoading}
        onClick={() => onDelete(todo.id)}
        type="button"
      >
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}
