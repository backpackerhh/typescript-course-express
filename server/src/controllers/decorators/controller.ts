import "reflect-metadata";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Invalid request, missing ${key}`);
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);

      if (!path) return;

      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.bodyValidator, target.prototype, key) || [];

      const routePath = routePrefix === "/" ? path : `${routePrefix}${path}`;
      const validator = bodyValidators(requiredBodyProps);

      router[method](routePath, ...middlewares, validator, routeHandler);
    }
  };
}
