"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.Query = {
    // Find Orders by Status
    //
    async getCustomerOrdersByStatus(_, args, { currentUser, models }) {
        utils_1.checkAuth(currentUser);
        const { status, orderBy = 'created_at', direction = 'desc' } = args;
        // Return all if no status included
        if (!status.length)
            return await models.CustomerOrder.query();
        const result = await models.CustomerOrder.query()
            .whereIn('status', status)
            .orderBy(orderBy, direction);
        return result;
    },
    // Find Individual Order by ID with all related info
    //
    async getCustomerOrder(_, args, { models, currentUser }) {
        utils_1.checkAuth(currentUser);
        const { id } = args;
        const order = await models.CustomerOrder.query()
            .eager('[customerOrderItems, refunds, additionalCharges, adminComments]')
            .where('id', id)
            .first();
        // Throw error if no order found
        if (!order)
            throw new Error('No order found with this ID.');
        return order;
    },
    // Search orders by partial match
    //
    async getCustomerOrdersLike(_, { column, value }, { currentUser, models }) {
        utils_1.checkAuth(currentUser);
        // Query DB
        const result = await models.CustomerOrder.query().where(column, 'ilike', `%${value}%`);
        // Throw error if no order found
        if (result.length === 0)
            throw new Error(`No orders found with ${column} of ${value}.`);
        return result;
    },
};
exports.Mutation = {};
//# sourceMappingURL=customerOrderResolvers.js.map