import { NextFunction, Request, Response } from "express";

interface MessageResponse {
  message: string;
}

type DefaultResponse = MessageResponse;

export interface TypedRequest<T = unknown> extends Request {
  body: T;
}
export interface TypedResponse<T = DefaultResponse> extends Response<T> {}

export interface TypedNextFunction extends NextFunction {}

export interface DataAndMessageResponse<T> extends MessageResponse {
  data: T;
}
