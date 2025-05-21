import { useStore } from "@web/stores/root-store";
import { TodoItem } from "./components/todo-item";

export function TodoList() {
  const { list, loadingIds, remove, toggleDone } = useStore(
    (state) => state.todo
  );

  return (
    <ul>
      {list.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleDone={toggleDone}
          remove={remove}
          isLoading={loadingIds.has(todo.id)}
        />
      ))}
    </ul>
  );
}
