"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../services/twilio/messages");
const statusList_1 = __importDefault(require("./statusList"));
const utils_1 = require("../../utils");
const twilio_1 = require("../../services/twilio");
exports.default = async (args, { models, currentUser }) => {
    utils_1.checkAuth(currentUser);
    const { status, customer_order_id, special_order_id } = args;
    const { SpecialOrder, CustomerOrder } = models;
    if (!statusList_1.default.includes(status))
        throw new Error('Invalid status');
    // Decide which model to use
    const Model = special_order_id ? SpecialOrder : CustomerOrder;
    const id = special_order_id ? special_order_id : customer_order_id;
    const order = await Model.query()
        .patch({ status })
        .where({ id })
        .returning('*')
        .first();
    const dbResponse = { success: true, message: order.id };
    //  Send twilio message if it is a matching status
    if (messages_1.textArray.includes(status) && customer_order_id) {
        const textResponse = await twilio_1.sendText(messages_1.textBody[status], order.phone);
        return {
            database: dbResponse,
            twilio: textResponse,
        };
    }
    // No text needed to be sent
    return {
        database: dbResponse,
        twilio: { success: false, message: 'No text needed to be sent' },
    };
};
//# sourceMappingURL=updateStatus.js.map