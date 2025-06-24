import { Mission } from "@/models/Mission";
import WayPlanService from "./interfaces/WayPlanService";

export function createWayPlanService(): WayPlanService {

    return {
        getAllRessources: function (): Mission[] {
            throw new Error("Function not implemented.");
        },
        createResource: function (): Mission {
            throw new Error("Function not implemented.");
        }
    }
}