"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signIn_1 = __importDefault(require("../../actions/signIn"));
const register_1 = __importDefault(require("../../actions/register"));
const utils_1 = require("../../utils");
exports.Query = {
    checkToken: (_, args, { currentUser }) => {
        utils_1.checkAuth(currentUser);
        return currentUser;
    },
};
exports.Mutation = {
    signIn: (_, { email, password }, { models }) => signIn_1.default(email, password, models.AdminUser),
    register: (_, payload, { models, currentUser }) => register_1.default(payload, models.AdminUser, currentUser),
};
//# sourceMappingURL=adminUserResolvers.js.map