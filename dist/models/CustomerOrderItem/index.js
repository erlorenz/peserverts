"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class CustomerOrderItem extends objection_1.Model {
}
CustomerOrderItem.tableName = 'customer_order_item';
CustomerOrderItem.relationMappings = {
    customerOrder: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: `${__dirname}/../CustomerOrder`,
        join: {
            from: 'customer_order_item.order_id',
            to: 'customer_order.id',
        },
    },
};
exports.default = CustomerOrderItem;
//# sourceMappingURL=index.js.map