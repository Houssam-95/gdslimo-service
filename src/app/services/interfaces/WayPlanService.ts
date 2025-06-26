import { Mission } from "@/app/models/Mission";
import { WayPlanApiResponse } from "@/app/models/WayPlanApiResponse";
import { MissionPayload } from "@/app/models/MissionPayload";

export default interface WayPlanService {
    getAllRessources: (params: any) => Promise<WayPlanApiResponse>;
    createResource: (mission: MissionPayload) => Promise<MissionPayload>;
}