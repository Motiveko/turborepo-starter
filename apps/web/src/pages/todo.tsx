import React from "react";
import { TodoInput } from "@web/features/todo/input";
import { TodoList } from "@web/features/todo/list";

const TodoPage: React.FC = () => (
  <div className="max-w-md mx-auto p-4 space-y-4">
    <h1 className="text-2xl font-bold">Async Zustand TodoList</h1>
    <TodoInput />
    <TodoList />
  </div>
);

export default TodoPage;
