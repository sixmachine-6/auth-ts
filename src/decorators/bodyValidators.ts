import { MetadataKeys } from "../enums/Metadata.keys";

export function bodyValidators(...keys: string[]) {
  return function (target: any, key: string) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
