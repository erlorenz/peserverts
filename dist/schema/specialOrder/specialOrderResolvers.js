"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const specialOrder_1 = __importDefault(require("../../actions/specialOrder"));
exports.Query = {
    // Find Orders by Status
    async getSpecialOrdersByStatus(_, args, { currentUser, models }) {
        utils_1.checkAuth(currentUser);
        const { status, orderBy = 'created_at', direction = 'desc' } = args;
        // Return all if no status included
        if (!status.length)
            return await models.SpecialOrder.query();
        const result = await models.SpecialOrder.query()
            .whereIn('status', status)
            .orderBy(orderBy, direction);
        return result;
    },
    async getSpecialOrder(_, args, { models, currentUser }) {
        const { id } = args;
        utils_1.checkAuth(currentUser);
        const order = await models.SpecialOrder.query()
            .eager('[refunds, additionalCharges, adminComments]')
            .where('id', id)
            .first();
        // Throw error if no order found
        if (!order)
            throw new Error('No order found with this ID.');
        return order;
    },
    // Search orders by partial match
    //
    async getSpecialOrdersLike(_, { column, value }, { currentUser, models }) {
        utils_1.checkAuth(currentUser);
        // Query DB
        const result = await models.SpecialOrder.query().where(column, 'ilike', `%${value}%`);
        // Throw error if no order found
        if (result.length === 0)
            throw new Error(`No orders found with ${column} of ${value}.`);
        return result;
    },
};
exports.Mutation = {
    createSpecialOrder(_, args, context) {
        return specialOrder_1.default(_, args, context);
    },
};
//# sourceMappingURL=specialOrderResolvers.js.map