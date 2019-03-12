"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const AdminCommentDisplay_1 = __importDefault(require("../AdminCommentDisplay"));
const AdditionalCharge_1 = __importDefault(require("../AdditionalCharge"));
const Refund_1 = __importDefault(require("../Refund"));
class SpecialOrder extends objection_1.Model {
}
SpecialOrder.tableName = 'special_order';
SpecialOrder.relationMappings = {
    refunds: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Refund_1.default,
        join: {
            from: 'special_order.id',
            to: 'refund.special_order_id',
        },
    },
    adminComments: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: AdminCommentDisplay_1.default,
        join: {
            from: 'special_order.id',
            to: 'admin_comment_display.special_order_id',
        },
    },
    additionalCharges: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: AdditionalCharge_1.default,
        join: {
            from: 'special_order.id',
            to: 'additional_charge.special_order_id',
        },
    },
};
exports.default = SpecialOrder;
//# sourceMappingURL=index.js.map