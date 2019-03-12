"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validate(payload) {
    const schema = {
        name: joi_1.default.string().required(),
        email: joi_1.default.string()
            .email()
            .required(),
        phone: joi_1.default.string()
            .min(10)
            .max(10)
            .required(),
        room: joi_1.default.string().required(),
        hotel: joi_1.default.string().required(),
        pickup_date: joi_1.default.string().required(),
        return_date: joi_1.default.string().required(),
        customerOrderItems: joi_1.default.array().required(),
        starch: joi_1.default.string().optional(),
        crease: joi_1.default.string().optional(),
        special_instructions: joi_1.default.string()
            .optional()
            .allow(''),
        total_price: joi_1.default.number()
            .min(1000)
            .max(100000)
            .required(),
        promo_code: joi_1.default.string().optional(),
        stripeToken: joi_1.default.string().required(),
        test: joi_1.default.boolean().optional(),
    };
    const result = joi_1.default.validate(payload, schema);
    if (result.error)
        throw new Error(result.error.details[0].message);
}
exports.default = validate;
//# sourceMappingURL=checkoutValidation.js.map