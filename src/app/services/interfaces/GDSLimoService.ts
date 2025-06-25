import { GDSLimoApiResponse } from "@/app/models/GDSLimoApiResponse";


export default interface GDSLimoService {
    getAllMissions: () => Promise<GDSLimoApiResponse>;
    getFilteredMissions(params: any): Promise<GDSLimoApiResponse>
    createMission: (mission: any) => Promise<GDSLimoApiResponse>;
}