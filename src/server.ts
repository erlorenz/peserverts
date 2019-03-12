import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apolloServer from './schema';
import initializeDB from './db';
import routes from './routes';
import logger from './config/winston';
import winston = require('winston');

const { PORT, NODE_ENV } = process.env;

// Initialize express
const app = express();

// Initialize Database and Objection
initializeDB();

// Middleware
app.use(morgan('common'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// GraphQL
apolloServer.applyMiddleware({ app });

// REST Routes
app.use('/', routes);

// Connect server to PORT

app.listen(PORT, () => {
  logger.info(
    `Environment: ${NODE_ENV},
      Express running at port: ${PORT}, 
      🚀 Apollo Server ready at /graphql.`
  );
});
