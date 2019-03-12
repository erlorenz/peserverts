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
const additionalChargeValidation_1 = __importDefault(require("./additionalChargeValidation"));
const insertAdditionalCharge_1 = __importDefault(require("./insertAdditionalCharge"));
const utils_1 = require("../../utils");
const mailjet_1 = require("../../services/mailjet");
exports.default = async (payload, { models, currentUser }) => {
    utils_1.checkAuth(currentUser);
    // Create data object
    const { amount, admin_user_id, customer_order_id, stripe_customer, name, email, special_order_id, } = payload;
    // Validate additional data -- fails on error
    additionalChargeValidation_1.default(payload);
    // Make additional charge -- fails on error
    const charge = await StripeController.createCharge(amount, stripe_customer, null);
    // Send receipt email
    const mailjetData = {
        name: name,
        email: email,
        amount: (amount / 100).toFixed(2),
    };
    // const emailResponse = await EmailController.additionalEmail(mailjetData);
    const emailResponse = await mailjet_1.sendAdditionalCharge(mailjetData);
    const additionalDetails = {
        stripe_charge: charge.id,
        amount,
        admin_user_id: admin_user_id,
        customer_order_id,
        special_order_id,
    };
    // Save to DB
    const dbResponse = await insertAdditionalCharge_1.default(additionalDetails, models.AdditionalCharge);
    return { receiptEmail: emailResponse, database: dbResponse };
};
//# sourceMappingURL=additionalCharge.js.map