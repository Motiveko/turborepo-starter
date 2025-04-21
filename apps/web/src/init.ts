import { enableMapSet } from "immer";
import {
  addErrorResponseInterceptor,
  removeErrorResponseInterceptor,
} from "@web/lib/http";
import { addToast } from "@web/features/toast/toast-service";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router";

export const preRenderSetup = () => {
  enableMapSet();
};

type PostRenderSetupOptions = {
  navigate: NavigateFunction;
};

export const postRenderSetup = ({ navigate }: PostRenderSetupOptions) => {
  const interceptorId = addErrorResponseInterceptor(async (error) => {
    // TODO : http 에러를 별도 에러로 래핑하고 unauthorized() 같은건 에러객체에 구현하도록 변경
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        await addToast({
          message: "Unauthorized",
          type: "error",
        });
        await navigate("/login");
      }
    }
  });

  return () => {
    removeErrorResponseInterceptor(interceptorId);
  };
};
