import { TodoItem } from "@web/features/todo/list/item";
import { useStore } from "@web/stores/root-store";

export function TodoList() {
  const { list, loadingIds, remove } = useStore((state) => state.todo);

  return (
    <ul>
      {list.map((todo) => (
        <TodoItem
          todo={todo}
          isLoading={loadingIds.has(todo.id)}
          onDelete={remove}
        />
      ))}
    </ul>
  );
}
