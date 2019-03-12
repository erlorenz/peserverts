import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import apollo from './schema';
import logger from 'koa-logger';

const { PORT, NODE_ENV } = process.env;

///// Koa /////

const app = new Koa();
const router = new Router();

// Middleware
app.use(logger());
app.use(bodyParser());

// Apply Apollo server middleware
apollo.applyMiddleware({ app });

// Wire up router
app.use(router.routes()).use(router.allowedMethods());

// Start Server
app.listen(PORT || 3001, () => {
  console.log(`Koa started on http://localhost:${PORT}`);
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
});
