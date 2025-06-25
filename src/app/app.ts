
import express, { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

export function startServer() {

    // Load environment variables from .env file
    dotenv.config();

    const app = express();

    // Middleware to enable CORS
    app.use(cors());

    // Middleware to parse JSON 
    app.use(express.json());


    const rootHandler: RequestHandler = (req, res) => {
        res.send('Hello World!');
    };

    app.get('/', rootHandler);


    const port = process.env.PORT || 3000;

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}

