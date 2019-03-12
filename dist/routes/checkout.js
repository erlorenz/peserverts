"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkout_1 = require("../controllers/checkout");
const mailjet_1 = require("../services/mailjet");
const messages_1 = require("../services/twilio/messages");
const twilio_1 = __importDefault(require("../services/twilio"));
const express_1 = require("express");
const router = express_1.Router();
// Receives most order info
router.post('/payment', async (req, res) => {
    try {
        const response = await checkout_1.payment(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});
// Receives all the order info
router.post('/receipt', async (req, res) => {
    try {
        const response = await checkout_1.receiptEmail(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});
// Only receives phone number
router.post('/text', async (req, res) => {
    let firstName = '';
    if (req.body.name) {
        firstName = req.body.name.split(' ')[0];
    }
    try {
        const textResponse = await twilio_1.default(messages_1.textBody.processed(firstName), req.body.phone);
        res.status(200).json(textResponse);
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});
// Receives all the database entry information
router.post('/dbtransaction', async (req, res) => {
    try {
        const response = await checkout_1.dbTransaction(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});
// Receives response to text, receipt, db, and the phone, email, and name
router.post('/error', async (req, res) => {
    try {
        const response = await mailjet_1.sendCheckoutError(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});
exports.default = router;
//# sourceMappingURL=checkout.js.map