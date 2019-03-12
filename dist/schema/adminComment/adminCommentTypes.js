"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type AdminComment {
    created_at: String
    comment_body: String
    id: ID
    customer_order_id: ID
    admin_user_id: ID
    special_order_id: ID
  }
  type AdminCommentDisplay {
    created_at: String
    comment_body: String
    customer_order_id: ID
    name: String
    email: String
    special_order_id: ID
    id: ID
  }

  extend type Query {
    getAdminCommentsByOrderID(
      customer_order_id: ID
      special_order_id: ID
    ): [AdminCommentDisplay!]
  }

  extend type Mutation {
    insertAdminComment(
      customer_order_id: ID
      special_order_id: ID
      admin_user_id: ID!
      comment_body: String!
    ): SuccessAndMessage
  }
`;
//# sourceMappingURL=adminCommentTypes.js.map