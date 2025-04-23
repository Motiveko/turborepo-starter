import type { Todo } from "@repo/interfaces";
import type { SliceCreator } from "@web/stores/root-store";
import { API } from "@web/api";

export interface TodoSlice {
  list: Todo[];
  loadingIds: Set<number>;
  add: (text: string) => Promise<void>;
  remove: (id: number) => Promise<void>;
  init: () => Promise<void>;
  isLoading: boolean;
}

export const createTodoSlice: SliceCreator<TodoSlice> = (set) => ({
  list: [],
  loadingIds: new Set(),
  isLoading: false,

  init: async () => {
    // TODO : set을 추상화해서 사용
    set((state) => {
      state.todo.isLoading = true;
    });
    try {
      const todos = await API.todo.list();
      set((state) => {
        state.todo.list = todos;
        state.todo.isLoading = false;
      });
    } catch (error) {
      set((state) => {
        state.todo.isLoading = false;
      });
    }
  },
  add: async (title: string) => {
    const todo = await API.todo.create({
      title,
      description: "-",
    });
    set((state) => {
      state.todo.list.push(todo);
    });
  },

  remove: async (id: number) => {
    set((state) => {
      state.todo.loadingIds.add(id);
    });

    await API.todo.delete(id);

    set((state) => {
      state.todo.list = state.todo.list.filter((todo) => todo.id !== id);
      state.todo.loadingIds.delete(id);
    });
  },
});
