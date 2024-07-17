"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
require("reflect-metadata");
const Metadata_keys_1 = require("../enums/Metadata.keys");
function routeBinder(method) {
    return function (routePath) {
        return function (target, key, desc) {
            Reflect.defineMetadata(Metadata_keys_1.MetadataKeys.route, routePath, target, key);
            Reflect.defineMetadata(Metadata_keys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder("get");
exports.post = routeBinder("post");
