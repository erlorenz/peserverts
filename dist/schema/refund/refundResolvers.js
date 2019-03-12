"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const refund_1 = __importDefault(require("../../actions/refund"));
const utils_1 = require("../../utils");
exports.Query = {
    async getRefundsByOrderID(_, args, { models, currentUser }) {
        utils_1.checkAuth(currentUser);
        const { customer_order_id, special_order_id } = args;
        // Search by either special order or order id
        const columnName = special_order_id
            ? 'special_order_id'
            : 'customer_order_id';
        const orderID = special_order_id ? special_order_id : customer_order_id;
        // Perform query
        const charges = await models.Refund.query().where(columnName, orderID);
        return charges;
    },
};
exports.Mutation = {
    insertRefund: (_, args, context) => refund_1.default(args, context),
};
//# sourceMappingURL=refundResolvers.js.map