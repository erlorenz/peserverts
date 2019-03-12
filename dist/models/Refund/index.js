"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Refund extends objection_1.Model {
}
Refund.tableName = 'refund';
Refund.relationMappings = {
    customerOrder: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: `${__dirname}/../CustomerOrder`,
        join: {
            from: 'refund.order_id',
            to: 'customer_order.id',
        },
    },
};
exports.default = Refund;
//# sourceMappingURL=index.js.map