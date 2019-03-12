"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const CustomerOrder_1 = __importDefault(require("../../models/CustomerOrder"));
const luxon_1 = require("luxon");
async function dbTransaction(payload) {
    let trx;
    // Format Timestamps into ISO for Postgres (turn string to number)
    payload.pickup_date = luxon_1.DateTime.fromMillis(+payload.pickup_date).toISO();
    payload.return_date = luxon_1.DateTime.fromMillis(+payload.return_date).toISO();
    try {
        // Begin Transaction
        trx = await objection_1.transaction.start(CustomerOrder_1.default.knex());
        await CustomerOrder_1.default.query(trx).insertGraph(payload);
        // Commit Transaction
        await trx.commit();
        return {
            success: true,
            message: 'Successfully entered into database.',
        };
    }
    catch (e) {
        // Rollback transaction on error
        if (trx)
            await trx.rollback();
        console.log(e);
        return {
            success: false,
            message: 'Error writing to database.',
        };
    }
}
exports.default = dbTransaction;
//# sourceMappingURL=dbTransaction.js.map