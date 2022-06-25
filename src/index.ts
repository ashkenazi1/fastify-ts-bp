import {AppRouter} from './AppRouter';
import {PORT} from './config';
import './controllers/AuthController';
import './controllers/HealthController';
import {MongoDB} from './models/mongo'

import dotenv from 'dotenv';

const app = AppRouter.getInstance();

const start = async () => {
    try {
        dotenv.config()
        const db = MongoDB.connect()
        await app.listen({port: PORT});
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
