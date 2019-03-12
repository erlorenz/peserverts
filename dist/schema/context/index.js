"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUser_1 = __importDefault(require("../../models/AdminUser"));
const CustomerOrder_1 = __importDefault(require("../../models/CustomerOrder"));
const CustomerOrderItem_1 = __importDefault(require("../../models/CustomerOrderItem"));
const SpecialOrder_1 = __importDefault(require("../../models/SpecialOrder"));
const AdminComment_1 = __importDefault(require("../../models/AdminComment"));
const AdminCommentDisplay_1 = __importDefault(require("../../models/AdminCommentDisplay"));
const AdditionalCharge_1 = __importDefault(require("../../models/AdditionalCharge"));
const Refund_1 = __importDefault(require("../../models/Refund"));
const verifyToken_1 = __importDefault(require("./verifyToken"));
const winston_1 = __importDefault(require("../../config/winston"));
exports.default = async ({ req }) => {
    const context = {
        // Add Models to Context
        models: {
            AdminUser: AdminUser_1.default,
            CustomerOrder: CustomerOrder_1.default,
            SpecialOrder: SpecialOrder_1.default,
            CustomerOrderItem: CustomerOrderItem_1.default,
            AdminComment: AdminComment_1.default,
            AdminCommentDisplay: AdminCommentDisplay_1.default,
            AdditionalCharge: AdditionalCharge_1.default,
            Refund: Refund_1.default,
        },
        // User defaults to null
        currentUser: null,
    };
    // Verify token
    try {
        const currentUser = await verifyToken_1.default(req, AdminUser_1.default);
        // Add the verified user to the context
        context.currentUser = currentUser;
    }
    catch (e) {
        winston_1.default.warn(e.message);
    }
    return context;
};
//# sourceMappingURL=index.js.map