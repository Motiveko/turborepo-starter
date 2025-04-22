import type { User } from "@repo/interfaces";
import { API } from "@web/api";
import { logger } from "@web/lib/logger";
import type { SliceCreator } from "@web/stores/root-store";

type StateStatus = "idle" | "loading" | "success";

export interface AuthSlice {
  user: User | null;
  status: StateStatus;
  updateStatus: (status: StateStatus) => void;
  updateUser: (user: User) => void;
  init: () => Promise<void>;
  logout: () => Promise<void>;
}

// TODO : 상태 update를 reducer 패턴을 쓸지 고민필요
export const createAuthSlice: SliceCreator<AuthSlice> = (set, get, store) => {
  return {
    user: null,
    status: "idle",
    updateStatus: (status: StateStatus) => {
      set((state) => {
        state.auth.status = status;
      });
    },
    updateUser: (user: User) => {
      set((state) => {
        state.auth.user = user;
      });
    },
    init: async () => {
      try {
        get().auth.updateStatus("loading");
        const user = await API.user.get();
        get().auth.updateUser(user);
      } catch (error) {
        logger.error(error);
      } finally {
        get().auth.updateStatus("success");
      }
    },
    logout: async () => {
      get().auth.updateStatus("loading");
      try {
        await API.user.logout();
        get().auth.updateStatus("success");
      } catch (error) {
        logger.error(error);
      } finally {
        get().auth.updateStatus("idle");
      }
    },
  };
};
