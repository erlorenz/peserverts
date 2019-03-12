"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type AdminUser {
    name: String
    email: String
    access_level: String
    id: ID
  }
  type AdminUserSignInResponse {
    token: String
    name: String
    access_level: String
    email: String
    id: ID
  }
  extend type Query {
    checkToken: AdminUser
  }
  extend type Mutation {
    signIn(email: String!, password: String!): AdminUserSignInResponse
    register(
      email: String!
      password: String!
      access_level: String
      name: String!
    ): AdminUser
  }
`;
//# sourceMappingURL=adminUserTypes.js.map