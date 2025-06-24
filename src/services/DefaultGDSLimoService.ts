import { Mission } from "@/models/Mission";
import GDSLimoService from "./interfaces/GDSLimoService";

export function createGDSLimoService(): GDSLimoService {
    //const webClient = 

    return {
        getAllMissions: function (): Mission[] {
            throw new Error("Function not implemented.");
        },
        createMission: function (mission: Mission): Mission {
            throw new Error("Function not implemented.");
        }
    };
}