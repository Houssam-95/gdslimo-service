import { createGDSLimoService } from "../services/DefaultGDSLimoService";

export function createMissionController() {
    const gdsLimoService = createGDSLimoService();

    // Add any other filters from query params
    // Object.entries(req.query).forEach(([key, value]) => {
    //     if (typeof value === 'string' && !key.includes('MIS_DATE_DEBUT')) {
    //         filters[key] = value;
    //     }
    // });


    return {
        getAllMissions() { },
        createMission(mission: any) { }
    }
}