
import express, { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import missionRouter from "./routes/missionRoutes";

export function startServer() {

    // Load environment variables from .env file
    dotenv.config();

    const app = express();


    // Middleware to enable CORS
    app.use(cors());

    // Middleware to parse JSON 
    app.use(express.json());

    // Routes for missions and mission
    // we can not create '/api/v1/missions' because for creation it's '/api/v1/mission' 
    // we delegate to missionRouter for handling routing
    app.use('/api/v1/', missionRouter)

    const routesInfo = {
        message: 'Bienvenue sur GDSLimo Api',
        routes: [
            { method: 'GET', path: '/api/v1/missions', description: 'Fetch list of missions' },
            { method: 'POST', path: '/api/v1/mission', description: 'Create a new mission' },
        ]
    };

    app.get('/', (req, res) => {
        res.json(routesInfo);
    });

    app.use((req, res) => {
        res.status(404).send('Ressource non trouvée.');
    });


    const port = process.env.PORT || 3000;

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}

