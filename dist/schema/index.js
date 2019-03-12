"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const adminUserTypes_1 = __importDefault(require("./adminUser/adminUserTypes"));
const adminCommentTypes_1 = __importDefault(require("./adminComment/adminCommentTypes"));
const customerOrderTypes_1 = __importDefault(require("./customerOrder/customerOrderTypes"));
const specialOrderTypes_1 = __importDefault(require("./specialOrder/specialOrderTypes"));
const additionalChargeTypes_1 = __importDefault(require("./additionalCharge/additionalChargeTypes"));
const refundTypes_1 = __importDefault(require("./refund/refundTypes"));
const sharedTypes_1 = __importDefault(require("./shared/sharedTypes"));
const adminUserResolvers = __importStar(require("./adminUser/adminUserResolvers"));
const customerOrderResolvers = __importStar(require("./customerOrder/customerOrderResolvers"));
const specialOrderResolvers = __importStar(require("./specialOrder/specialOrderResolvers"));
const adminCommentResolvers = __importStar(require("./adminComment/adminCommentResolvers"));
const refundResolvers = __importStar(require("./refund/refundResolvers"));
const additionalChargeResolvers = __importStar(require("./additionalCharge/additionalChargeResolvers"));
const sharedResolvers = __importStar(require("./shared/sharedResolvers"));
const context_1 = __importDefault(require("./context"));
const typeDefs = [
    customerOrderTypes_1.default,
    adminCommentTypes_1.default,
    adminUserTypes_1.default,
    specialOrderTypes_1.default,
    sharedTypes_1.default,
    additionalChargeTypes_1.default,
    refundTypes_1.default,
];
// Combine resolvers
const resolvers = {
    Query: Object.assign({}, customerOrderResolvers.Query, specialOrderResolvers.Query, adminCommentResolvers.Query, refundResolvers.Query, additionalChargeResolvers.Query, adminUserResolvers.Query),
    Mutation: Object.assign({}, adminUserResolvers.Mutation, customerOrderResolvers.Mutation, specialOrderResolvers.Mutation, adminCommentResolvers.Mutation, refundResolvers.Mutation, additionalChargeResolvers.Mutation, sharedResolvers.Mutation),
};
// Enable Graphql playground in staging
const enablePlaygound = process.env.PLAYGROUND
    ? { introspection: true, playground: true }
    : {};
exports.default = new apollo_server_express_1.ApolloServer(Object.assign({ typeDefs,
    resolvers,
    context: context_1.default }, enablePlaygound));
//# sourceMappingURL=index.js.map