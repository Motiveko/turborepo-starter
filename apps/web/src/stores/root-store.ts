import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TodoSlice } from "@web/features/todo/slice";
import { createTodoSlice } from "@web/features/todo/slice";

export type RootSlice = {
  todo: TodoSlice;
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
  }))
);
