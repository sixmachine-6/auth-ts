"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = use;
const Metadata_keys_1 = require("../enums/Metadata.keys");
function use(middleware) {
    return function (target, key) {
        const middlewares = Reflect.getMetadata(Metadata_keys_1.MetadataKeys.middleware, target, key) || key;
        Reflect.defineMetadata(Metadata_keys_1.MetadataKeys.middleware, [...middlewares, middleware], target, key);
    };
}
