import type { NextFunction, Request, Response } from "express";

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

export type TypedResponse<T = DefaultResponse> = Response<T>

export type TypedNextFunction = NextFunction

export interface DataAndMessageResponse<T> extends MessageResponse {
  data: T;
}
