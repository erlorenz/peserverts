"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = (payload) => {
    const schema = {
        name: joi_1.default.string()
            .min(4)
            .required(),
        email: joi_1.default.string()
            .email()
            .required(),
        company: joi_1.default.string().required(),
        phone: joi_1.default.string()
            .min(10)
            .max(10)
            .required(),
        description: joi_1.default.string().required(),
        total_price: joi_1.default.number().required(),
        stripeToken: joi_1.default.string().required(),
    };
    const result = joi_1.default.validate(payload, schema);
    if (result.error)
        throw new Error(result.error.details[0].message);
    return result;
};
//# sourceMappingURL=specialOrderValidation.js.map