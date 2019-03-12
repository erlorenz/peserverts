"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type AdditionalCharge {
    created_at: String
    amount: Int
    id: ID
    customer_order_id: ID
    admin_user_id: ID
    special_order_id: ID
    stripe_charge: ID
    description: String
  }

  type AdditionalChargeResponse {
    receiptEmail: SuccessAndMessage
    database: SuccessAndMessage
  }

  extend type Query {
    getAdditionalChargesByOrderID(
      customer_order_id: ID
      special_order_id: ID
    ): [AdditionalCharge]
  }
  extend type Mutation {
    insertAdditionalCharge(
      customer_order_id: ID
      special_order_id: ID
      admin_user_id: ID!
      amount: Int!
      stripe_customer: String!
      name: String!
      email: String!
    ): AdditionalChargeResponse
  }
`;
//# sourceMappingURL=additionalChargeTypes.js.map