"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateStatus_1 = __importDefault(require("../../actions/updateStatus"));
exports.Mutation = {
    updateStatus(_, args, context) {
        return updateStatus_1.default(args, context);
    },
};
//# sourceMappingURL=sharedResolvers.js.map