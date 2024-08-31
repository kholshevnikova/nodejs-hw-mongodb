// io9cN72LTUipi6zR

import mongoose from "mongoose";

import { env } from "../utils/env.js";
export const initMongoDB = async () => {
    try {
        const user = env('MONGODB_USER');
        const password = env('MONGODB_PASSWORD');
        const url = env('MONGODB_URL');
        const db = env('MONGODB_DB');

        const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
        await mongoose.connect(DB_HOST);
        console.log('Connect succes');
    } catch (error) {
        console.log('Connect error', error.message);
        throw error;

    }
};
