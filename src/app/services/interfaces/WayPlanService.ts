import { Mission } from "@/app/models/Mission";
import { WayPlanApiResponse } from "@/app/models/WayPlanApiResponse";
import { WayPlanNewItem } from "@/app/models/WayPlanNewItem";

export default interface WayPlanService {
    getAllRessources: (params: any) => Promise<WayPlanApiResponse>;
    createResource: (mission: Mission) => Promise<WayPlanNewItem>;
}