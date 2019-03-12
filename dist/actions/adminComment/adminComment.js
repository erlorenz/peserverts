"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminCommentValidation_1 = __importDefault(require("./adminCommentValidation"));
const utils_1 = require("../../utils");
exports.default = async (payload, { models, currentUser }) => {
    utils_1.checkAuth(currentUser);
    adminCommentValidation_1.default(payload);
    try {
        const adminComment = await models.AdminComment.query().insert(payload);
        return { success: true, message: adminComment.id };
    }
    catch (e) {
        return { success: false, message: e.detail || e.message };
    }
};
//# sourceMappingURL=adminComment.js.map