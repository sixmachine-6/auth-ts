import { RequestHandler } from "express";
import { MetadataKeys } from "../enums/Metadata.keys";

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || key;

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
