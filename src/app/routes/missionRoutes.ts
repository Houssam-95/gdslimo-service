import { Router } from "express";
import { createMissionController } from "../controllers/missionController";

const missionController = createMissionController();

const router = Router();

router.get('/missions', missionController.getAllMissions)
//router.post('/mission', missionController.createMission)


export default router;