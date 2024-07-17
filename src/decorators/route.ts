import "reflect-metadata";
import { MetadataKeys } from "../enums/Metadata.keys";
import { Methods } from "../enums/Methods";

function routeBinder(method: string) {
  return function (routePath: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeys.route, routePath, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder("get");
export const post = routeBinder("post");
