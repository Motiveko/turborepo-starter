import { TodoInput } from "@web/features/todo/input";
import { TodoList } from "@web/features/todo/list";
import { useStore } from "@web/stores/root-store";
import { useEffect } from "react";

function TodoPage() {
  const init = useStore((state) => state.todo.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Async Zustand TodoList</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default TodoPage;
