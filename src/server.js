import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
// import {get} from 'mongoose';
// import * as contactServices from './services/contacts.js';





export const setupServer = () => {
    const app = express();
    const logger = pino({
        transport: {
            target: 'pino-pretty'
        }
    });

    app.use(logger);
    app.use(cors());
    app.use(express.json());

    app.use(contactsRouter);
    

    const PORT = Number(env("PORT", 3000));
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

