"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = require("../../services/stripe");
const specialOrderValidation_1 = __importDefault(require("./specialOrderValidation"));
const utils_1 = require("../../utils");
const insertSpecialOrder_1 = __importDefault(require("./insertSpecialOrder"));
exports.default = async (_, args, { models, currentUser }) => {
    utils_1.checkAuth(currentUser);
    const orderFields = Object.assign({}, args);
    const { SpecialOrder } = models;
    // Validate Data
    specialOrderValidation_1.default(orderFields);
    // Format Phone
    orderFields.phone = utils_1.formatPhone(orderFields.phone);
    // Create Metadata
    const metadata = {
        email: orderFields.email,
        name: orderFields.name,
        phone: orderFields.phone,
    };
    // Create Stripe customer
    const customer = await stripe_1.createCustomer(orderFields.email, orderFields.stripeToken, metadata);
    // Create Stripe charge
    const charge = await stripe_1.createCharge(orderFields.total_price, customer.id, metadata);
    // Add Stripe customer and charge to orderFields
    orderFields.stripe_charge = charge.id;
    orderFields.stripe_customer = customer.id;
    delete orderFields.stripeToken;
    // Save order in DB
    const dbResponse = await insertSpecialOrder_1.default(orderFields, SpecialOrder);
    // Send success response
    return {
        database: dbResponse,
    };
};
//# sourceMappingURL=specialOrder.js.map