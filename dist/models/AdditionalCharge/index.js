"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
// avoid circular import by using direct
class AdditionalCharge extends objection_1.Model {
}
AdditionalCharge.tableName = 'additional_charge';
AdditionalCharge.relationMappings = {
    customerOrder: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: `${__dirname}/../CustomerOrder`,
        join: {
            from: 'additional_charge.customer_order_id',
            to: 'customer_order.id',
        },
    },
};
exports.default = AdditionalCharge;
//# sourceMappingURL=index.js.map