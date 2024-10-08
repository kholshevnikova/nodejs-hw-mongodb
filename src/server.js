import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import swaggerDocs from './middlewares/swaggerDocs.js';

export const setupServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());
  app.use(authRouter);
  app.use(contactsRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(env('PORT', 3000));
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
