"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const schema_1 = __importDefault(require("./schema"));
const db_1 = __importDefault(require("./db"));
const routes_1 = __importDefault(require("./routes"));
const winston_1 = __importDefault(require("./config/winston"));
// Initialize express
const app = express_1.default();
// Initialize Database and Objection
db_1.default();
// Middleware
app.use(morgan_1.default('combined'));
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.json());
// GraphQL
schema_1.default.applyMiddleware({ app });
// REST Routes
app.use('/', routes_1.default);
// Connect server to PORT
const { PORT, NODE_ENV } = process.env;
app.listen(PORT, () => {
    winston_1.default.info(`Express running at: ${PORT}, 
    Environment: ${NODE_ENV},
    🚀 Server ready.`);
});
//# sourceMappingURL=server.js.map