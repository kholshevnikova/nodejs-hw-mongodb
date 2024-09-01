import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
// import {get} from 'mongoose';
import * as contactServices from './services/contacts.js';





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

    //routes
    app.get('/contacts', async (req, res) => {
        const data = await contactServices.getAllContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
    });

    app.get('/contacts/:id', async (req, res) => {

        // console.log(req.params);
        const {id} = req.params;
        const data = await contactServices.getContactById(id);

        if (!data) {
            return res.status(404).json({
                message: `Contact not found`,
            });
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data,
        });
    });

    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((error, req, res, next) => {
        res.status(500).json({
            message: error.message,
        });
    });


    const PORT = Number(env("PORT", 3000));
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

