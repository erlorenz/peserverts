"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = (payload) => {
    const schema = {
        comment_body: joi_1.default.string().required(),
        admin_user_id: joi_1.default.string().required(),
        special_order_id: joi_1.default.optional(),
        customer_order_id: joi_1.default.optional(),
    };
    const result = joi_1.default.validate(payload, schema);
    if (result.error)
        throw new Error(result.error.details[0].message);
    return result;
};
//# sourceMappingURL=adminCommentValidation.js.map