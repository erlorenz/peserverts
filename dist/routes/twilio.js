"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const twilio_1 = __importDefault(require("twilio"));
const winston_1 = __importDefault(require("../config/winston"));
const router = express_1.Router();
// Send an autoresponse text if they text back
router.post('/notifications/sms', (req, res) => {
    const twiml = new twilio_1.default.twiml.MessagingResponse();
    twiml.message('These notifications are auto-generated. Please call 702-620-3315 or email support@pressexpresslv.com if you need to contact us.');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});
// Forward call to office phone if they call
router.post('/notifications/voice', (request, response) => {
    const twiml = new twilio_1.default.twiml.VoiceResponse();
    twiml.say({ voice: 'alice' }, 'Forwarding now!');
    twiml.dial(undefined, '702-620-3315');
    winston_1.default.warn('Had to stick an undefined in there. Might not dial correctly!');
    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
});
exports.default = router;
//# sourceMappingURL=twilio.js.map