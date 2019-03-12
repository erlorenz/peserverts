"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerValidation_1 = __importDefault(require("./registerValidation"));
const utils_1 = require("../../utils");
exports.default = async (payload, AdminUser, currentUser) => {
    utils_1.checkAuth(currentUser);
    registerValidation_1.default(payload);
    const { access_level, email, password, name } = payload;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    const result = await AdminUser.query().insert({
        email,
        password: hash,
        name,
        access_level,
    });
    return result;
};
//# sourceMappingURL=register.js.map