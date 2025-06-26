import { Request, Response } from "express";
import { createGDSLimoService } from "@/app/services/DefaultGDSLimoService";
import { GDSLimoApiResponse } from "@/app/models/GDSLimoApiResponse";
import { mapRequestQueryToWayPlanQuery } from "@/app/libs/utils/queryParserUtils";
import axios from "axios";
import { MissionPayload } from "@/app/models/MissionPayload";

export function createMissionController() {
    const gdsLimoService = createGDSLimoService();


    return {
        async getAllMissions(req: Request, res: Response) {
            console.log(`📡 [MissionController] getAllMissions() #query: `, req.query);

            try {
                let response: GDSLimoApiResponse;

                if (Object.keys(req.query).length === 0) {
                    // no query params we returns all missions
                    // it's just an mvp, on real app we need to use pageRequest to avoid loading all database;
                    response = await gdsLimoService.getAllMissions();


                } else {
                    const params = mapRequestQueryToWayPlanQuery(req.query);
                    response = await gdsLimoService.getFilteredMissions(params)
                }

                res.send(response);
            }
            catch (error) {

                if (axios.isAxiosError(error) && error.response) {
                    res.status(error.response.status).json({
                        message: `Erreur de l'API Wayplan: ${error.response.statusText || 'Requête échouée'}`,
                        details: error.response.data || "Aucun détail d'erreur fourni.",
                        code: error.response.status
                    });
                } else if (error instanceof Error) {
                    res.status(500).json({
                        message: 'Une erreur interne est survenue lors de la récupération des missions.',
                        details: error.message // Peut être retiré en production pour éviter de fuiter des détails sensibles
                    });
                } else {
                    // Pour les erreurs non-Error (très rare, mais bonne pratique)
                    res.status(500).json({
                        message: 'Une erreur inconnue est survenue.',
                    });
                }
            }
        },

        async createMission(req: Request, res: Response) {
            const missionPayload: MissionPayload = req.body;

            try {

                if (!missionPayload || missionPayload.length === 0 || !missionPayload[0]?.params) {
                    res.status(400).json({ message: 'Le corps de la requete ne doit pas être vide, il faut fournir les éléments manquants' });
                }

                const response = await gdsLimoService.createMission(missionPayload);
                res.status(201).json(response);
            }
            catch (error) {
                console.error(`🚨 [MissionController] createMission() #error: `, error);

                // Gestion des erreurs spécifiques d'Axios si votre service les relance
                if (axios.isAxiosError(error) && error.response) {
                    res.status(error.response.status).json({
                        message: `Erreur de l'API Wayplan lors de la création de la mission: ${error.response.statusText || 'Création échouée'}`,
                        details: error.response.data || "Aucun détail d'erreur fourni.",
                        code: error.response.status
                    });
                } else if (error instanceof Error) {

                    res.status(500).json({
                        message: 'Une erreur interne est survenue lors de la création de la mission.',
                        details: error.message
                    });
                } else {
                    res.status(500).json({
                        message: 'Une erreur inconnue est survenue lors de la création de la mission.',
                    });
                }
            }
        }
    }
}