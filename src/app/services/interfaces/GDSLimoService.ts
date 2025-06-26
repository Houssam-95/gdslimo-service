import { GDSLimoApiResponse } from "@/app/models/GDSLimoApiResponse";
import { GDSLimoNewItem } from "@/app/models/GDSLimoNewItem";
import { Mission } from "@/app/models/Mission";


export default interface GDSLimoService {
    getAllMissions: () => Promise<GDSLimoApiResponse>;
    getFilteredMissions(params: any): Promise<GDSLimoApiResponse>
    createMission: (mission: Mission) => Promise<GDSLimoNewItem>;
}