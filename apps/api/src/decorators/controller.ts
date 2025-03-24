import type { NextFunction, RequestHandler } from "express";

/** request handler(controller)에서 에러 발생시 next()로 전달해서 에러 핸들러로 보내질 수 있도록 하는 wrapper function */
const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req: any, res: any, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export function Controller() {
  return function (constructor: Function) {
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
