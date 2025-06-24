import { Mission } from "@/models/Mission";

export default interface GDSLimoService {
    getAllMissions: () => Mission[];
    createMission: (mission: Mission) => Mission;
}