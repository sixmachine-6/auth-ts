import "reflect-metadata";
import { MetadataKeys } from "../enums/Metadata.keys";
import { router } from "./../AppRouter";
import { Methods } from "../enums/Methods";
import { Request, Response, NextFunction, RequestHandler } from "express";

function bodyValidator(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }
    next();
  };
}
export function controller(mainPath: string) {
  return function (target: Function) {
    for (let key of Object.getOwnPropertyNames(target.prototype)) {
      if (key === "constructor") continue;
      const path = Reflect.getMetadata(
        MetadataKeys.route,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const validators =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      let middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      middlewares = middlewares.filter((el: any) => typeof el !== "string");

      const validator = bodyValidator(validators);

      if (path) {
        router[method](
          `${mainPath}${path}`,
          ...middlewares,
          validator,
          target.prototype[key]
        );
      }
    }
  };
}
