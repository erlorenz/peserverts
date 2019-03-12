"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkout_1 = __importDefault(require("./checkout"));
const twilio_1 = __importDefault(require("./twilio"));
const express_1 = require("express");
const routes = express_1.Router();
// Server ping
routes.get('/', (req, res) => res.send(`Server is running in ${process.env.NODE_ENV} mode!`));
// Routes
routes.use('/checkout', checkout_1.default);
routes.use('/twilio', twilio_1.default);
// 404
routes.all('*', (req, res) => res.status(404).send('404 route not found.'));
exports.default = routes;
//# sourceMappingURL=index.js.map