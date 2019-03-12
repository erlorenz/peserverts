"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const CustomerOrderItem_1 = __importDefault(require("../CustomerOrderItem"));
const AdminCommentDisplay_1 = __importDefault(require("../AdminCommentDisplay"));
const AdditionalCharge_1 = __importDefault(require("../AdditionalCharge"));
const Refund_1 = __importDefault(require("../Refund"));
class CustomerOrder extends objection_1.Model {
}
CustomerOrder.tableName = 'customer_order';
CustomerOrder.relationMappings = {
    customerOrderItems: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: CustomerOrderItem_1.default,
        join: {
            from: 'customer_order.id',
            to: 'customer_order_item.customer_order_id',
        },
    },
    refunds: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Refund_1.default,
        join: {
            from: 'customer_order.id',
            to: 'refund.customer_order_id',
        },
    },
    adminComments: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: AdminCommentDisplay_1.default,
        join: {
            from: 'customer_order.id',
            to: 'admin_comment_display.customer_order_id',
        },
    },
    additionalCharges: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: AdditionalCharge_1.default,
        join: {
            from: 'customer_order.id',
            to: 'additional_charge.customer_order_id',
        },
    },
};
exports.default = CustomerOrder;
//# sourceMappingURL=index.js.map