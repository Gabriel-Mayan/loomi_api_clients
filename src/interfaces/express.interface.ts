import { ParsedQs } from "qs";
import { ZodTypeAny } from "zod";
import { ParamsDictionary } from "express-serve-static-core";
import { Request as Req, Response as Res, NextFunction } from "express";

type IProperty = "query" | "body" | "params" | "user";
interface IRequest<B = undefined, P = undefined, Q = undefined> extends Req {
  body: B;
  query: Q & ParsedQs;
  params: P & ParamsDictionary;
};

interface IRequestUser<B = undefined, P = undefined, Q = undefined> extends Req {
  body: B;
  query: Q & ParsedQs;
  params: P & ParamsDictionary;

  user: any;
};

export interface Response extends Res { };
export interface Next extends NextFunction { };

export type Request<B = undefined, P = undefined, Q = undefined> = (request: IRequest<B, P, Q>, response: Response) => Promise<Response>;
export type RequestUser<B = undefined, P = undefined, Q = undefined> = (request: IRequestUser<B, P, Q>, response: Response) => Promise<Response>;

export type ErrorMiddleware = (error: Error, request: IRequest, response: Response, next: Next) => Response;
export type ValidationMiddleware = (schema: ZodTypeAny, property?: IProperty) => (request: IRequestUser, response: Response, next: Next) => void;
