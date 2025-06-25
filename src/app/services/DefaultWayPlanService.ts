import { Mission } from "@/app/models/Mission";
import { WayPlanApiResponse } from "@/app/models/WayPlanApiResponse";
import WayPlanService from "./interfaces/WayPlanService";
import axios from "axios";
import jwt from 'jsonwebtoken';

type WayPlanJwtHeader = {
    alg: string;
    typ: string;
    apiKey?: string;
    time?: number;
}

export function createWayPlanService(): WayPlanService {
    const GDS_URL = process.env.GDS_URL || "https://api.waynium.com/gdsv3";
    const API_KEY = process.env.API_KEY || "dev";
    const limo = API_KEY;
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

    function defineJWT(params: any = []) {
        const jwtHeader: WayPlanJwtHeader = {
            alg: 'HS256',
            typ: 'JWT',
            apiKey: API_KEY,
        }

        if (JWT_TIME_EXPIRATION_ENABLED) {
            const expirationTime = Math.floor((new Date().getTime() / 1000));
            return jwt.sign(
                {
                    "limo": "dev",
                    "params": params
                },
                SECRET_KEY,
                { header: jwtHeader, expiresIn: expirationTime }
            );
        }

        // JWT Time expiration not enabled we return an jwt without expiration
        return jwt.sign(
            {
                "limo": "dev",
                "params": params,
            },
            SECRET_KEY,
            { header: jwtHeader }
        );
    }


    return {
        async getAllRessources(params: any = { "C_GEN_MISSION": [] }): Promise<WayPlanApiResponse> {

            const jwtToken = defineJWT(params);

            const response = await webClient.post<WayPlanApiResponse>(
                "/get-ressource",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    }
                }
            );

            // a response has limo value as key { "dev": {} } instead of { "limo": "dev" }
            return response.data;

        },
        async createResource(): Promise<WayPlanApiResponse> {
            throw new Error("Function not implemented.");
        }
    }
}