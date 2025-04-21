import { SliceCreator } from "@web/stores/root-store";
import { API } from "@web/api";

export interface Todo {
  id: number;
  text: string;
}

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
    // TODO : set을 한번만 호출하거나 아예 호출 안하는 방식(redux toolkit)으로 변경 가능한지 확인
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
});
