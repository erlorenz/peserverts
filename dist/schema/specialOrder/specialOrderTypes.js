"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type SpecialOrder {
    name: String
    total_price: Int
    status: String
    id: ID
    phone: String
    email: String
    company: String
    description: String
    adminComments: [AdminCommentDisplay]
    refunds: [Refund]
    additionalCharges: [AdditionalCharge]
    picked_up: String
    checked_in: String
    out_for_delivery: String
    completed: String
    stripe_charge: String
    stripe_customer: String
    created_at: String!
  }
  type SpecialOrderResponse {
    database: SuccessAndMessage
  }

  extend type Query {
    getSpecialOrdersByStatus(
      status: [String!]
      direction: String
      orderBy: String
    ): [SpecialOrder]
    getSpecialOrder(id: ID!): SpecialOrder
    getSpecialOrdersLike(column: String, value: String): [SpecialOrder]
  }

  extend type Mutation {
    createSpecialOrder(
      name: String!
      total_price: Int!
      phone: String!
      email: String!
      company: String!
      description: String!
      stripeToken: String!
    ): SpecialOrderResponse
  }
`;
//# sourceMappingURL=specialOrderTypes.js.map