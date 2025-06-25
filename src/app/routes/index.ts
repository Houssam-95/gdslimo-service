import { Router } from 'express';
import missionRoutes from './missionRoutes';

const router = Router();


// Mission routes
router.use('/missions', missionRoutes);

