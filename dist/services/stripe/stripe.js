"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const keys_1 = require("../../config/keys");
const stripe = new stripe_1.default(keys_1.stripeKey);
// Create New Customer
async function createCustomer(email, token, metadata) {
    return await stripe.customers.create({
        email,
        source: token,
        metadata,
    });
}
exports.createCustomer = createCustomer;
// Create New Charge
async function createCharge(amount, customerID, metadata) {
    return await stripe.charges.create({
        amount,
        currency: 'usd',
        description: 'Press Express Las Vegas',
        customer: customerID,
        metadata,
    });
}
exports.createCharge = createCharge;
// Create New Refund
async function createRefund(amount, chargeID, metadata) {
    return await stripe.refunds.create({
        charge: chargeID,
        amount,
        metadata,
    });
}
exports.createRefund = createRefund;
//# sourceMappingURL=stripe.js.map