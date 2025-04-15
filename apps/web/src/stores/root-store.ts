import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createTodoSlice, TodoSlice } from "@web/features/todo/slice";
import { createThemeSlice, ThemeSlice } from "@web/features/theme/slice";

export type RootSlice = {
  todo: TodoSlice;
  theme: ThemeSlice;
};

export type SliceCreator<T> = StateCreator<
  RootSlice,
  [["zustand/immer", never]],
  [],
  T
>;

export const useStore = create<RootSlice>()(
  immer((...args) => ({
    todo: createTodoSlice(...args),
    theme: createThemeSlice(...args),
  }))
);
