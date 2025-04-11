/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any -- for extends type */
import type { NextFunction, Request, Response } from "express";
import type { User as CustomUser } from "@api/entities/user";

// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html
// 파일 명이 반드시 index.d.ts 여야함. 어떤걸 변경하는지는 directory명으로 구분한다.
// e.g. express.d.ts 로 하면 에러가 발생함
declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}

interface MessageResponse {
  message: string;
}

type DefaultResponse = MessageResponse;

export interface TypedRequest<T = unknown, V extends Record<string, any> = any>
  extends Request {
  body: T;
  params: V;
}

export type RequestWithBody<T> = TypedRequest<T>;

export type RequestWithParams<T extends Record<string, any>> = TypedRequest<
  unknown,
  T
>;

export type TypedResponse<T = DefaultResponse> = Response<T>;

export type TypedNextFunction = NextFunction;

export interface DataAndMessageResponse<T> extends MessageResponse {
  data: T;
}
