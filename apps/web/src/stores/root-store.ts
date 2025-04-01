import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import type { ToastSlice } from "@web/features/todo/use-toast-slice";
// import { createToastSlice } from "@web/features/todo/use-toast-slice";
import type { TodoSlice } from "@web/features/todo/use-todo-slice";
import { createTodoSlice } from "@web/features/todo/use-todo-slice";

export const useStore = create<TodoSlice>()(
  immer((...args) => ({
    ...createTodoSlice(...args),
  }))
);
