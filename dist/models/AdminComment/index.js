"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
// avoid circular import by using direct
class AdminComment extends objection_1.Model {
}
AdminComment.tableName = 'admin_comment';
AdminComment.relationMappings = {
    adminUser: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: `${__dirname}/../AdminUser`,
        join: {
            from: 'admin_comment.admin_user_id',
            to: 'admin_user.id',
        },
    },
};
exports.default = AdminComment;
class AdminCommentDisplay extends objection_1.Model {
}
AdminCommentDisplay.tableName = 'admin_comment_display';
AdminCommentDisplay.relationMappings = {
    adminUser: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: `${__dirname}/../CustomerOrder`,
        join: {
            from: 'admin_comment_display.customer_order_id',
            to: 'customer_order.id',
        },
    },
};
exports.AdminCommentDisplay = AdminCommentDisplay;
//# sourceMappingURL=index.js.map