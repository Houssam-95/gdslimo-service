import { Mission } from "./Mission";

export type WayPlanApiResponse = {
    [limo: string]: {
        C_GEN_MISSION: Mission[];
    }
}