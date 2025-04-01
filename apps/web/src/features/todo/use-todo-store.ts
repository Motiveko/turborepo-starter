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

const wait = (time: number) =>
  new Promise((res) => {
    setTimeout(res, time);
  });

export const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    loadingIds: new Set(),

    addTodo: async (text: string) => {
      await wait(500);

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

      await wait(800);

      set((state) => {
        state.todos = state.todos.filter((todo) => todo.id !== id);
        state.loadingIds.delete(id);
      });
    },
  }))
);
