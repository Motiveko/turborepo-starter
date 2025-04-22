import { devtools } from "zustand/middleware";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TodoSlice } from "@web/features/todo/slice";
import { createTodoSlice } from "@web/features/todo/slice";
import type { ThemeSlice } from "@web/features/theme/slice";
import { createThemeSlice } from "@web/features/theme/slice";
import type { AuthSlice } from "@web/features/auth/slice";
import { createAuthSlice } from "@web/features/auth/slice";

export interface RootSlice {
  todo: TodoSlice;
  theme: ThemeSlice;
  auth: AuthSlice;
}

export type SliceCreator<T> = StateCreator<
  RootSlice,
  [["zustand/immer", never]],
  [],
  T
>;

// slice 패턴으로 하나의 store만 사용하도록 구현함
// store를 쪼갤 수 있으나 devtools 사용시 redux devtools에서 하나의 store만 보여주기 때문에 디버깅이 어려워짐
export const useStore = create<RootSlice>()(
  devtools(
    immer((...args) => ({
      todo: createTodoSlice(...args),
      theme: createThemeSlice(...args),
      auth: createAuthSlice(...args),
    }))
  )
);
