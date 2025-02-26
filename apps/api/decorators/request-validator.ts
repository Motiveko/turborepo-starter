import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function ValidateBody<T extends object>(dtoClass: new () => T) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const dtoObject = plainToInstance(dtoClass, req.body);
      const errors = await validate(dtoObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length > 0) {
        const messages = errors
          .map((err) => Object.values(err.constraints || {}))
          .join(", ");
        return res.status(400).json({ message: messages });
      }
      // 검증 통과 시 원래 핸들러 실행
      return originalMethod.apply(this, [req, res, next]);
    };
  };
}
