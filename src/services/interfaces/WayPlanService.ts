import { Mission } from "@/models/Mission";

export default interface WayPlanService {
    getAllRessources: () => Mission[];
    createResource: () => Mission;
}