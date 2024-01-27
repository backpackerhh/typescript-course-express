import "reflect-metadata";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function defineRouteDecorator(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = defineRouteDecorator(Methods.get);
export const post = defineRouteDecorator(Methods.post);
export const put = defineRouteDecorator(Methods.put);
export const destroy = defineRouteDecorator(Methods.destroy);
export const patch = defineRouteDecorator(Methods.patch);
