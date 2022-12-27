import cors from 'cors';
import express, { Application } from 'express';
import userRoutes from '../routes/user';

import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    };

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '8000';

        // Metodos iniciales
        this.dbConnections();
        this.middlewares();
        this.routes();

    };

    async dbConnections() {

        try {
            
            await db.authenticate();
            console.log('Database online :D');
            

        } catch ( error: any ) {
            
            throw new Error( error );

        };

    };

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lesctura body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static( 'public' ) );

    };

    routes() {

        this.app.use( this.apiPaths.users, userRoutes );

    };

    listen() {

        this.app.listen( this.port, () => {

            console.log(`Servidor corriendo en puerto ${this.port}`);

        });

    };

};

export default Server;