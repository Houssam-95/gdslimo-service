
import { WayPlanApiResponse } from "@/app/models/WayPlanApiResponse";
import WayPlanService from "./interfaces/WayPlanService";
import axios, { AxiosResponse } from "axios";
import jwt from 'jsonwebtoken';
import { MissionPayload } from "../models/MissionPayload";

type WayPlanJwtHeader = {
    alg: string;
    typ: string;
    apiKey?: string;
    time?: number;
}

export function createWayPlanService(): WayPlanService {
    const GDS_URL = process.env.GDS_URL || "https://api.waynium.com/gdsv3";
    const API_KEY = process.env.API_KEY || "dev";
    const SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY";

    const JWT_TIME_EXPIRATION_ENABLED = (process.env.JWT_TIME_EXPIRATION_ENABLED) ? true : false;

    const webClient = axios.create({
        baseURL: `${GDS_URL}/`,
        timeout: 10000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        params: {}
    });

    function defineJWTWithPayload(params: any = []) {
        const jwtHeader: WayPlanJwtHeader = {
            alg: 'HS256',
            typ: 'JWT',
            apiKey: API_KEY,
        }

        if (JWT_TIME_EXPIRATION_ENABLED) {
            const expirationTime = Math.floor((new Date().getTime() / 1000));
            return jwt.sign(
                {
                    "limo": API_KEY,
                    "params": params
                },
                SECRET_KEY,
                { header: jwtHeader, expiresIn: expirationTime }
            );
        }

        // JWT Time expiration not enabled we return an jwt without expiration
        return jwt.sign(
            {
                "limo": API_KEY,
                "params": params,
            },
            SECRET_KEY,
            { header: jwtHeader }
        );
    }

    function defineJWTForCreateMission(missionData: MissionPayload): string {
        // body guard for missionPayload even if already taken care in missionController
        if (!missionData || missionData.length === 0 || !missionData[0]?.params) {
            throw new Error("Invalid or empty missionData structure for JWT creation.");
        }

        // payload need to be `{ "limo": "...", "params": { ... } }`
        const jwtPayloadContent = {
            limo: missionData[0].limo,
            params: missionData[0].params
        };

        const jwtHeader: WayPlanJwtHeader = {
            alg: 'HS256',
            typ: 'JWT',
            apiKey: API_KEY,
        };

        const expirationTime = Math.floor((new Date().getTime() / 1000));

        if (JWT_TIME_EXPIRATION_ENABLED) {
            return jwt.sign(
                jwtPayloadContent,
                SECRET_KEY,
                { header: jwtHeader, expiresIn: expirationTime }
            );
        }

        return jwt.sign(
            jwtPayloadContent,
            SECRET_KEY,
            { header: jwtHeader }
        );
    }


    return {
        async getAllRessources(params: any = { "C_GEN_MISSION": [] }): Promise<WayPlanApiResponse> {
            console.log(`📡 [WayPlanService] getAllRessources()`,);

            const jwtToken = defineJWTWithPayload(params);

            try {
                // empty body, payload already in jwt
                const response = await webClient.post<WayPlanApiResponse>(
                    "/get-ressource",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        }
                    }
                );
                return response.data;

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(`Erreur lors de l'envoi de la requête GET-RESOURCE à Wayplan : ${error.message}`);
                    if (error.response) {
                        console.error('Statut HTTP :', error.response.status);
                        console.error("JSON error: ", JSON.stringify(error.response.data, null, 2));
                    }
                    throw new Error(`Erreur Wayplan API pour (get-ressource): ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
                } else {
                    throw error;
                }
            }
        },
        async createResource(missionData: MissionPayload): Promise<MissionPayload> {
            console.log(`📡 [WayPlanService] createResource()`);

            const jwtToken = defineJWTForCreateMission(missionData);

            try {
                // empty body, payload already in jwt
                const response = await webClient.post(
                    "/set-ressource-v2",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(`📡 [WayPlanService] createResource() axios.error >> on create/update : ${error}`);
                    throw error;
                } else {
                    console.error(`📡 [WayPlanService] createResource() error on create/update`);
                    throw new Error('Une erreur inattendue est survenue dans le service de création de mission.');
                }
            }
        }
    }
}