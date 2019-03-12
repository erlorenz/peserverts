"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminComment_1 = __importDefault(require("../../actions/adminComment"));
const utils_1 = require("../../utils");
exports.Query = {
    async getAdminCommentsByOrderID(_, args, { models, currentUser }) {
        utils_1.checkAuth(currentUser);
        const { customer_order_id, special_order_id } = args;
        // Search by either special order or order id
        const columnName = special_order_id
            ? 'special_order_id'
            : 'customer_order_id';
        const orderID = special_order_id ? special_order_id : customer_order_id;
        // Perform query
        const comments = await models.AdminCommentDisplay.query().where(columnName, orderID);
        return comments;
    },
};
exports.Mutation = {
    insertAdminComment: (_, args, context) => adminComment_1.default(args, context),
};
//# sourceMappingURL=adminCommentResolvers.js.map