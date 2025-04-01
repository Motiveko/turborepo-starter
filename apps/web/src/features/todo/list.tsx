import { useTodoStore } from "@web/features/todo/use-todo-store";

export function TodoList() {
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
            type="button"
          >
            {loadingIds.has(todo.id) ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
