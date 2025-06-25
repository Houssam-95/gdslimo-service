import { Request, Response } from "express";
import { createGDSLimoService } from "../services/DefaultGDSLimoService";
import { GDSLimoApiResponse } from "../models/GDSLimoApiResponse";
import { mapRequestQueryToWayPlanQuery } from "../libs/utils/queryParserUtils";

export function createMissionController() {
    const gdsLimoService = createGDSLimoService();


    return {
        async getAllMissions(req: Request, res: Response) {
            console.log(`📡 [MissionController] getAllMissions() #query: `, req.query);

            let response: GDSLimoApiResponse;

            if (Object.keys(req.query).length === 0) {
                // no query params we returns all missions
                // it's just an mvp, on real app we need to use pageRequest to avoid loading all database;
                response = await gdsLimoService.getAllMissions();


            } else {
                const params = mapRequestQueryToWayPlanQuery(req.query);
                response = await gdsLimoService.getFilteredMissions(params)
            }

            res.send(response);

        },
        async createMission(req: Request, res: Response) {
            const newMission = req.body;
            if (!newMission) {
                return res.status(400).json({ message: 'Mission JSON object is required' });
            }
            const response = await gdsLimoService.createMission(newMission);
            res.status(201).json(response);
        }
    }
}