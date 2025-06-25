import { Request, Response } from "express";
import { createGDSLimoService } from "../services/DefaultGDSLimoService";
import { GDSLimoApiResponse } from "../models/GDSLimoApiResponse";
import { transformMinMaxQuery } from "../libs/utils/queryParserUtils";

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
                res.send(response);

            } else {
                const params = transformMinMaxQuery(req.query);
                response = await gdsLimoService.getFilteredMissions(params)
            }

            response = await gdsLimoService.getAllMissions();
            res.send(response);

        },
        async createMission(req: Request, res: Response) {
            const newMission = req.body;
            if (newMission) {
                const response = await gdsLimoService.createMission(newMission);

                // TODO we handle our self 201 resource created or we returns response from wayPlan if resource is correctly created
                return res.send(response);
            }

            return res.status(400).json({
                message: "Mission JSON object is needed to create a new one"
            });
        }
    }
}