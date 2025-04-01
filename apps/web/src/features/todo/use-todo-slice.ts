import type { StateCreator } from "zustand/vanilla";

export interface Todo {
  id: number;
  text: string;
}

export interface TodoSlice {
  todo: {
    list: Todo[];
    loadingIds: Set<number>;
    add: (text: string) => Promise<void>;
    remove: (id: number) => Promise<void>;
  };
}

export const createTodoSlice: StateCreator<
  TodoSlice,
  [["zustand/immer", never]],
  [],
  TodoSlice
> = (set) => ({
  todo: {
    list: [],
    loadingIds: new Set(),

    add: async (text: string) => {
      await new Promise((res) => {
        setTimeout(res, 500);
      });
      set((state) => {
        state.todo.list.push({
          id: Date.now(),
          text,
        });
      });
    },

    remove: async (id: number) => {
      set((state) => {
        state.todo.loadingIds.add(id);
      });

      await new Promise((res) => {
        setTimeout(res, 500);
      });

      set((state) => {
        state.todo.list = state.todo.list.filter((todo) => todo.id !== id);
        state.todo.loadingIds.delete(id);
      });
    },
  },
});
