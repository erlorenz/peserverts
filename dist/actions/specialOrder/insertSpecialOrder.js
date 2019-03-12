"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (orderFields, SpecialOrder) => {
    try {
        const order = await SpecialOrder.query().insert(orderFields);
        console.log(order);
        return { success: true, message: order.id };
    }
    catch (e) {
        return { success: false, message: e.detail || e.message };
    }
};
//# sourceMappingURL=insertSpecialOrder.js.map