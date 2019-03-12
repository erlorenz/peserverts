"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkAuth(user) {
    if (!user)
        throw new Error('Invalid token');
    return user;
}
exports.default = checkAuth;
//# sourceMappingURL=checkAuth.js.map