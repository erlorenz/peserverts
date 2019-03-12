"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../../config/keys");
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const mailjet = node_mailjet_1.default.connect(keys_1.mailjetKey, keys_1.mailjetSecret);
async function sendRefund(payload) {
    try {
        const message = {
            Messages: [
                // The customer email
                {
                    From: {
                        Email: 'support@pressexpresslv.com',
                        Name: 'Press Express',
                    },
                    To: [
                        {
                            Email: payload.email,
                            Name: payload.name,
                        },
                    ],
                    TemplateID: 715429,
                    TemplateLanguage: true,
                    Subject: 'Your Press Express Receipt',
                    Variables: payload,
                    TemplateErrorDeliver: true,
                    TemplateErrorReporting: {
                        Email: 'support@pressexpresslv.com',
                        Name: 'Admin',
                    },
                },
                // Duplicate email to support
                {
                    From: {
                        Email: 'amin@pressexpresslv.com',
                        Name: 'Admin',
                    },
                    To: [
                        {
                            Email: 'support@pressexpresslv.com',
                            Name: 'Admin',
                        },
                    ],
                    TemplateID: 715429,
                    TemplateLanguage: true,
                    Subject: `Additional Charge - ${payload.name}`,
                    Variables: payload,
                    TemplateErrorDeliver: true,
                    TemplateErrorReporting: {
                        Email: 'support@pressexpresslv.com',
                        Name: 'Admin',
                    },
                },
            ],
        };
        await mailjet.post('send', { version: 'v3.1' }).request(message);
        return { success: true, message: 'Receipt email sent.' };
    }
    catch (e) {
        console.log(e);
        return { success: false, message: e.ErrorMessage };
    }
}
exports.sendRefund = sendRefund;
exports.default = sendRefund;
//# sourceMappingURL=sendRefund.js.map