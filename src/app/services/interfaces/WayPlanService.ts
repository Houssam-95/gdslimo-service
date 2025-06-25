import { WayPlanApiResponse } from "@/app/models/WayPlanApiResponse";

export default interface WayPlanService {
    getAllRessources: (params: any) => Promise<WayPlanApiResponse>;
    createResource: (mission: any) => Promise<WayPlanApiResponse>;
}