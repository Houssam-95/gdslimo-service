import GDSLimoService from "./interfaces/GDSLimoService";
import { createWayPlanService } from "./DefaultWayPlanService";
import { GDSLimoApiResponse } from "../models/GDSLimoApiResponse";
import { Mission } from "../models/Mission";
import { GDSLimoNewItem } from "../models/GDSLimoNewItem";

export function createGDSLimoService(): GDSLimoService {
    const wayPlanService = createWayPlanService();

    return {
        async getAllMissions(): Promise<GDSLimoApiResponse> {
            const params = {
                "C_GEN_MISSION": []
            };

            console.log(`📡 [GDSLimoService] getAllMissions()`,);
            return wayPlanService.getAllRessources(params);
        },
        async getFilteredMissions(params): Promise<GDSLimoApiResponse> {
            return wayPlanService.getAllRessources(params);
        },
        async createMission(mission: Mission): Promise<GDSLimoNewItem> {
            return wayPlanService.createResource(mission);
        }
    };
}