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

        const topMechs = await PilotRecord.listTop(10);

        const data = topMechs.map(mech => {
            return {
                name: mech.name,
                wins: mech.wins
            }
        })

        res
            .status(200)
            .json(data)

    })