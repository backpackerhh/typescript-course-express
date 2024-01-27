import "reflect-metadata";

export function enumerable(isEnumerable: boolean) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = isEnumerable;
  };
}
