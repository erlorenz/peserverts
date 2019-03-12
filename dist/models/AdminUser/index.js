"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const AdminComment_1 = __importDefault(require("../AdminComment"));
const Refund_1 = __importDefault(require("../Refund"));
const AdditionalCharge_1 = __importDefault(require("../AdditionalCharge"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../../config/keys");
class AdminUser extends objection_1.Model {
    constructor() {
        super(...arguments);
        this.generateJWT = () => {
            const payload = { email: this.email };
            const token = jsonwebtoken_1.default.sign(payload, keys_1.jwtSecret, { expiresIn: 3600 });
            return token;
        };
    }
}
AdminUser.tableName = 'admin_user';
AdminUser.relationMappings = {
    adminComments: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: AdminComment_1.default,
        join: {
            from: 'admin_user.id',
            to: 'admin_comment.admin_user_id',
        },
    },
    refunds: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Refund_1.default,
        join: {
            from: 'admin_user.id',
            to: 'refund.admin_user_id',
        },
    },
    additionalCharges: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: AdditionalCharge_1.default,
        join: {
            from: 'admin_user.id',
            to: 'additional_charge.admin_user_id',
        },
    },
};
exports.default = AdminUser;
//# sourceMappingURL=index.js.map