
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

    // Routes
    app.use('/api/v1/missions', missionRouter)

    // Route de base de l'API 
    app.get('/api/v1/', (req, res) => {
        res.json({
            message: 'Bienvenue sur GDSLimo Api',
            resources: {
                missions: '/api/v1/missions'
            }
        });
    });

    // Route par défaut si aucune autre route ne correspond
    app.use((req, res) => {
        res.status(404).send('Ressource non trouvée.');
    });


    const port = process.env.PORT || 3000;

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}

