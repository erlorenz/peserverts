"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../../config/keys");
exports.default = async (req, AdminUser) => {
    // Extract token
    const token = req.header('x-auth-token') || '';
    if (!token)
        throw new Error('No token in header');
    // Verify token
    const decoded = jsonwebtoken_1.default.verify(token, keys_1.jwtSecret);
    const user = await AdminUser.query()
        .where('email', decoded.email)
        .first();
    if (!user)
        throw new Error('Unauthorized');
    delete user.password;
    return user;
};
//# sourceMappingURL=verifyToken.js.map