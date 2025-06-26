import { FraisMission } from "./FraisMission";
import { EtapeDePresence } from "./EtapeDePresence";
import { Presence } from "./Presence";


// C_GEN_MISSION (MIS)
export type Mission = {
    ref?: string;
    MIS_TSE_ID: string;
    MIS_TVE_ID: string;
    MIS_DATE_DEBUT: string;
    MIS_HEURE_DEBUT: string;
    MIS_HEURE_FIN: string;
    C_Com_FraisMission: FraisMission[];
    C_Gen_EtapePresence: EtapeDePresence[];
    C_Gen_Presence: Presence[];
}

