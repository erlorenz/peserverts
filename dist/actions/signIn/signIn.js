"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.default = async (email, password, AdminUser) => {
    // Validate
    if (!email || !password)
        throw new Error('Username/password can not be blank');
    // Check if user exists
    const user = await AdminUser.query()
        .where({ email })
        .first();
    if (!user)
        throw new Error('Incorrect username/password');
    // Compare password to password in DB
    const isMatch = await bcryptjs_1.default.compareSync(password, user.password);
    if (!isMatch)
        throw new Error('Incorrect password/username');
    // Generate JWT
    const token = user.generateJWT();
    return {
        token,
        name: user.name,
        email: user.email,
        access_level: user.access_level,
        id: user.id,
    };
};
//# sourceMappingURL=signIn.js.map