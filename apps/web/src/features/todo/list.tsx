import { useStore } from "@web/stores/root-store";

export function TodoList() {
  const { list, loadingIds, remove } = useStore((state) => state.todo);

  return (
    <ul>
      {list.map((todo) => (
        <li className="flex items-center gap-2" key={todo.id}>
          <span>{todo.title}</span>
          <button
            className="text-red-500 disabled:text-gray-300"
            disabled={loadingIds.has(todo.id)}
            onClick={() => remove(todo.id)}
            type="button"
          >
            {loadingIds.has(todo.id) ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
