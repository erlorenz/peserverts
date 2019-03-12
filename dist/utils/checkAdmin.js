"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkAdmin(user) {
    if (user.access_level !== 'admin')
        throw new Error('User must have admin access level');
    return user;
}
exports.default = checkAdmin;
//# sourceMappingURL=checkAdmin.js.map