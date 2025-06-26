import { GDSLimoApiResponse } from "@/app/models/GDSLimoApiResponse";
import { MissionPayload } from "@/app/models/MissionPayload";


export default interface GDSLimoService {
    getAllMissions: () => Promise<GDSLimoApiResponse>;
    getFilteredMissions(params: any): Promise<GDSLimoApiResponse>
    createMission: (mission: MissionPayload) => Promise<MissionPayload>;
}