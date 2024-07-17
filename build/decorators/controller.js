"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = controller;
require("reflect-metadata");
const Metadata_keys_1 = require("../enums/Metadata.keys");
const AppRouter_1 = require("./../AppRouter");
function bodyValidator(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send("Invalid request");
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    };
}
function controller(mainPath) {
    return function (target) {
        for (let key of Object.getOwnPropertyNames(target.prototype)) {
            if (key === "constructor")
                continue;
            const path = Reflect.getMetadata(Metadata_keys_1.MetadataKeys.route, target.prototype, key);
            const method = Reflect.getMetadata(Metadata_keys_1.MetadataKeys.method, target.prototype, key);
            const validators = Reflect.getMetadata(Metadata_keys_1.MetadataKeys.validator, target.prototype, key) ||
                [];
            let middlewares = Reflect.getMetadata(Metadata_keys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            middlewares = middlewares.filter((el) => typeof el !== "string");
            const validator = bodyValidator(validators);
            if (path) {
                AppRouter_1.router[method](`${mainPath}${path}`, ...middlewares, validator, target.prototype[key]);
            }
        }
    };
}
