import type { StateCreator } from "zustand";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TodoSlice } from "@web/features/todo/slice";
import { createTodoSlice } from "@web/features/todo/slice";
import type { ThemeSlice } from "@web/features/theme/slice";
import { createThemeSlice } from "@web/features/theme/slice";

export interface RootSlice {
  todo: TodoSlice;
  theme: ThemeSlice;
}

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
