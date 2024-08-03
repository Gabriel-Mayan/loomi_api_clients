import { ParsedQs } from "qs";
import { ZodTypeAny } from "zod";
import { ParamsDictionary } from "express-serve-static-core";
import { Request as Req, Response as Res, NextFunction } from "express";
import { TCustomErrors } from "../services/error.service";

type IProperty = "query" | "body" | "params" | "user";
interface IRequest<B = undefined, P = undefined, Q = undefined> extends Req {
  body: B & { [x: string]: [y: any] };
  query: Q & ParsedQs;
  params: P & ParamsDictionary;
};

export interface Response extends Res { };
export interface Next extends NextFunction { };

export type Request<B = undefined, P = undefined, Q = undefined> = (request: IRequest<B, P, Q>, response: Response) => Promise<Response>;

export type AuthMiddleware = (request: IRequest, response: Response, next: Next) => void;
export type ErrorMiddleware = (error: Error, request: IRequest, response: Response, next: Next) => Response;
export type ValidationMiddleware = (schema: ZodTypeAny, property?: IProperty) => (request: IRequest, response: Response, next: Next) => void;
