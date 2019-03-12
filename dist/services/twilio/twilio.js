"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const keys_1 = require("../../config/keys");
exports.client = twilio_1.default(keys_1.twilioSID, keys_1.twilioToken);
async function sendText(bodyText, toNumber) {
    try {
        // Create and send the twilio message
        await exports.client.messages.create({
            body: bodyText,
            to: toNumber,
            from: keys_1.twilioNumber,
        });
        return { success: true, message: 'Twilio Text Sent' };
    }
    catch (e) {
        return { success: false, message: e.message };
    }
}
exports.sendText = sendText;
function sendTextNoResponse(bodyText, toNumber) {
    exports.client.messages.create({
        body: bodyText,
        to: toNumber,
        from: keys_1.twilioNumber,
    });
}
exports.sendTextNoResponse = sendTextNoResponse;
//# sourceMappingURL=twilio.js.map