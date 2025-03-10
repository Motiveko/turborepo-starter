import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Todo {
  id: number;
  text: string;
}

interface TodoState {
  todos: Todo[];
  loadingIds: Set<number>;
  addTodo: (text: string) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>()(
  immer((set, get) => ({
    todos: [],
    loadingIds: new Set(),

    addTodo: async (text: string) => {
      await new Promise((res) => setTimeout(res, 500));

      set((state) => {
        state.todos.push({
          id: Date.now(),
          text,
        });
      });
    },

    removeTodo: async (id: number) => {
      set((state) => {
        state.loadingIds.add(id);
      });

      await new Promise((res) => setTimeout(res, 800));

      set((state) => {
        state.todos = state.todos.filter((todo) => todo.id !== id);
        state.loadingIds.delete(id);
      });
    },
  }))
);
