import { Router } from "express";
import * as path from "path";
import { PilotRecord } from "../records/pilot.record";


export const hallOfFameRouter = Router();



hallOfFameRouter

    .get('/', async (req, res) => {
        res
            .sendFile('hall-of-fame.html', {
                root: path.join(__dirname, '../public/html'),
            })
    })
    .get('/top-mechs', async (req, res) => {

        const topPilots = await PilotRecord.listTop(8);

        const data = topPilots.map(pilot => {
            return {
                name: pilot.pilotName,
                wins: pilot.wins,
                mechName: pilot.mechName,

            }
        })

        res
            .status(200)
            .json(data)

    })