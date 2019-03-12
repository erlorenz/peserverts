"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StripeController = __importStar(require("../../services/stripe"));
const refundValidation_1 = __importDefault(require("./refundValidation"));
const insertRefund_1 = __importDefault(require("./insertRefund"));
const utils_1 = require("../../utils");
const sendRefund_1 = __importDefault(require("../../services/mailjet/sendRefund"));
exports.default = async (payload, { models, currentUser }) => {
    utils_1.checkAuth(currentUser);
    // Validate data
    refundValidation_1.default(payload);
    // Make refund -- fails on error
    const refundResponse = await StripeController.createRefund(payload.amount, payload.stripe_charge, undefined);
    // Send receipt email
    const mailjetData = {
        amount: (payload.amount / 100).toFixed(2),
        name: payload.name,
        email: payload.email,
    };
    const receiptResponse = await sendRefund_1.default(mailjetData);
    // Update database
    const refundDetails = {
        stripe_refund: refundResponse.id,
        amount: payload.amount,
        admin_user_id: payload.admin_user_id,
        customer_order_id: payload.customer_order_id,
        special_order_id: payload.special_order_id,
    };
    const dbResponse = await insertRefund_1.default(refundDetails, models);
    return { receiptEmail: receiptResponse, database: dbResponse };
};
//# sourceMappingURL=refund.js.map