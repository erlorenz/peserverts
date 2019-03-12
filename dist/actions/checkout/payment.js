"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = require("../../services/stripe");
const utils_1 = require("../../utils");
const checkoutValidation_1 = __importDefault(require("./checkoutValidation"));
const twilio_1 = require("../../services/twilio");
const luxon_1 = require("luxon");
async function payment(payload) {
    // Create order object and metadata object
    const orderFields = Object.assign({}, payload);
    const metadata = {
        email: orderFields.email,
        name: orderFields.name,
        phone: '',
        total_price: orderFields.total_price,
        hotel: orderFields.hotel,
        room: orderFields.room,
        pickup_date: orderFields.pickup_date,
        return_date: orderFields.return_date,
    };
    try {
        try {
            // Validation
            checkoutValidation_1.default(orderFields);
            // Format phone number - fails on error
            const formattedPhone = utils_1.formatPhone(orderFields.phone);
            metadata.phone = formattedPhone;
            orderFields.phone = formattedPhone;
        }
        catch (e) {
            console.log(e);
            // Return the validation error if it doesnt work
            return {
                stripe_charge: '',
                stripe_customer: '',
                phone: '',
                error: 'validation',
                message: e.message,
            };
        }
        // Create Stripe customer
        const customer = await stripe_1.createCustomer(orderFields.email, orderFields.stripeToken, metadata);
        delete orderFields.stripeToken;
        // Create Stripe Charge
        const charge = await stripe_1.createCharge(orderFields.total_price, customer.id, metadata);
        // Send text notification, dont wait for a response
        twilio_1.sendTextNoResponse(`New order ${orderFields.hotel} - pickup at ${luxon_1.DateTime.fromMillis(+orderFields.pickup_date)
            .setZone('America/Los_Angeles')
            .toFormat('EEEE h:mm a')}`, process.env.PERSONAL_PHONE);
        // Return Stripe Charge and Customer ID
        return {
            stripe_charge: charge.id,
            stripe_customer: customer.id,
            phone: orderFields.phone,
            error: '',
            message: 'Successfully completed payment',
        };
    }
    catch (e) {
        // If stripe fails return payment error
        return {
            stripe_charge: '',
            stripe_customer: '',
            phone: '',
            error: 'payment',
            message: e.message,
        };
    }
}
exports.default = payment;
//# sourceMappingURL=payment.js.map