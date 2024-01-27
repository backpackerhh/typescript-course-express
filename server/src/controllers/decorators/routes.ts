import "reflect-metadata";

function defineRouteDecorator(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", method, target, key);
    };
  };
}

export const get = defineRouteDecorator("get");
export const post = defineRouteDecorator("post");
export const put = defineRouteDecorator("put");
export const destroy = defineRouteDecorator("delete");
export const patch = defineRouteDecorator("patch");
