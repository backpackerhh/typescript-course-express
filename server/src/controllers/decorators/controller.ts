import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata("method", target.prototype, key);

      if (!path) return;

      if (routePrefix === "/") {
        router[method](path, routeHandler);
      } else {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
