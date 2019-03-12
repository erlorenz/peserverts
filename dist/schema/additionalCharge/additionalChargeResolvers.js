"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const additionalCharge_1 = __importDefault(require("../../actions/additionalCharge"));
const utils_1 = require("../../utils");
exports.Query = {
    async getAdditionalChargesByOrderID(_, payload, { models, currentUser }) {
        utils_1.checkAuth(currentUser);
        const { customer_order_id, special_order_id } = payload;
        // Search by either special order or order id
        const columnName = special_order_id
            ? 'special_order_id'
            : 'customer_order_id';
        const orderID = special_order_id ? special_order_id : customer_order_id;
        // Perform query
        const charges = await models.AdditionalCharge.query().where(columnName, orderID);
        return charges;
    },
};
exports.Mutation = {
    insertAdditionalCharge: (_, args, context) => additionalCharge_1.default(args, context),
};
//# sourceMappingURL=additionalChargeResolvers.js.map