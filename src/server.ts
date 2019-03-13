import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import apollo from './schema';
import logger from 'koa-logger';
import initializeDB from './db';
import cors from '@koa/cors';

const { PORT, NODE_ENV } = process.env;

///// Koa /////
const app = new Koa();
const router = new Router();

// DB
initializeDB();

// Middleware
app.use(cors());
app.use(logger());
app.use(bodyParser());

// Apply Apollo server
apollo.applyMiddleware({ app });

// Wire up routes
app.use(router.routes()).use(router.allowedMethods());

// Start Server
app.listen(PORT || 3001, () => {
  console.log(`Koa started on http://localhost:${PORT}`);
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
});
