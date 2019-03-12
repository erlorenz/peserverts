"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = (payload) => {
    const schema = {
        name: joi_1.default.string().required(),
        email: joi_1.default.string()
            .email()
            .required(),
        password: joi_1.default.string().required(),
        access_level: joi_1.default.string().required(),
    };
    const result = joi_1.default.validate(payload, schema);
    if (result.error)
        throw new Error(result.error.details[0].message);
    return result;
};
//# sourceMappingURL=registerValidation.js.map