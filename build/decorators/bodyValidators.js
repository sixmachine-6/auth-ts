"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidators = bodyValidators;
const Metadata_keys_1 = require("../enums/Metadata.keys");
function bodyValidators(...keys) {
    return function (target, key) {
        Reflect.defineMetadata(Metadata_keys_1.MetadataKeys.validator, keys, target, key);
    };
}
