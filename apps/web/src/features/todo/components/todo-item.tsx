import type { Todo } from "@repo/interfaces";

interface TodoItemProps {
  todo: Todo;
  toggleDone: (id: number, isDone: boolean) => Promise<void>;
  remove: (id: number) => Promise<void>;
  isLoading: boolean;
}

export function TodoItem({ todo, toggleDone, remove, isLoading }: TodoItemProps) {
  const handleToggle = () => {
    toggleDone(todo.id, !todo.isDone);
  };

  const handleDelete = () => {
    remove(todo.id);
  };

  return (
    <div className="p-4 border rounded shadow-sm my-2 flex justify-between items-center">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={handleToggle}
          disabled={isLoading}
          className="mr-2 h-5 w-5" // Example styling for checkbox
        />
        <span>{todo.title}</span>
      </div>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="text-red-500 hover:text-red-700 disabled:text-gray-300"
      >
        Delete
      </button>
    </div>
  );
}
