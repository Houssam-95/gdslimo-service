import { PassagerIdDetails } from "./PassagerIdDetails";

// C_GEN_Presence (PRS)
export type Presence = {
    PRS_TRI: string;
    PRS_PAS_ID: PassagerIdDetails | string;
    PRS_CMI: {
        NB_ADULTE: string;
        NB_BEBE: string;
        NB_ENFANT: string;
        NBRE_BAGAGE_CABINE: string;
        NBRE_BAGAGE_SOUTE: string;
        NB_GUIDE: string;
        NB_HANDICAPE_ASSISTE: string;
        NB_HANDICAPE_NON_ASSISTE: string;
        NB_GRAND_SAC: string;
        NB_HANDICAPE_FAUTEUIL: string;
        NB_SIEGE_AUTO: string;
        NB_SIEGE_BEBE: string;
        NB_SIEGE_REHAUSSEUR: string;
    }
}

