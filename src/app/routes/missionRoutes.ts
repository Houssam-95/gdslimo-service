import { Router } from "express";
import { createMissionController } from "../controllers/missionController";

const missionController = createMissionController();

const router = Router();

router
    .get('/', missionController.getAllMissions)
    .post('/', missionController.createMission)


export default router;