"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const mailjet_1 = require("../../services/mailjet");
async function receiptEmail(payload) {
    const orderFields = Object.assign({}, payload);
    // Format the prices
    const addSubtotal = orderFields.customerOrderItems.map((item) => (Object.assign({}, item, { subTotal: ((item.price * item.quantity) / 100).toFixed(2) })));
    const total_price = (orderFields.total_price / 100).toFixed(2);
    const emailPayload = {
        phone: orderFields.phone,
        name: orderFields.name,
        email: orderFields.email,
        hotel: orderFields.hotel,
        room: orderFields.room,
        pickup_date: luxon_1.DateTime.fromMillis(+orderFields.pickup_date)
            .setZone('America/Los_Angeles')
            .toFormat('EEEE, M/d h:mm a'),
        return_date: luxon_1.DateTime.fromMillis(+orderFields.return_date)
            .setZone('America/Los_Angeles')
            .toFormat('EEEE, M/d h:mm a'),
        customerOrderItems: addSubtotal,
        total_price,
    };
    const receiptResponse = await mailjet_1.sendReceipt(emailPayload);
    return receiptResponse;
}
exports.default = receiptEmail;
//# sourceMappingURL=receiptEmail.js.map