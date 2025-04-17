import type { NextFunction, RequestHandler, Request, Response } from "express";

/** request handler(controller)에서 에러 발생시 next()로 전달해서 에러 핸들러로 보내질 수 있도록 하는 wrapper function */
const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- TODO : void 표현식 처리 방법 찾기(그냥 promise 래핑하는걸 고려)
    Promise.resolve(fn(req, res, next)).catch((e) => {
      next(e);
    });
  };
};

export function Controller() {
  return function wrapController(constructor: Function) {
    const methodNames = Object.getOwnPropertyNames(
      constructor.prototype
    ).filter(
      (name) =>
        name !== "constructor" &&
        typeof constructor.prototype[name] === "function"
    );

    for (const methodName of methodNames) {
      const originalMethod = constructor.prototype[methodName];
      constructor.prototype[methodName] = asyncHandler(originalMethod);
    }
  };
}
