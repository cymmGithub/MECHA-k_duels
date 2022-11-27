import { Router } from "express";
import { rmSync } from "fs";
import * as path from "path";
import { PilotRecord } from "../records/pilot.record";
import { ValidationError } from "../utils/error";


export const duelRouter = Router();



duelRouter

    .get('/', (req, res) => {
        const { playerId } = req.cookies;
        if (!playerId) {
            res.status(400);
            res.json('Sign up for tournament first');

        }

        res
            .sendFile('duel.html', {
                root: path.join(__dirname, '../public/html')
            })

    })
    .get('/player', async (req, res) => {
        const { playerId } = req.cookies as {
            playerId: string
        }


        const player = await PilotRecord.getOne(playerId)
        res.status(200)
        res.json(player);

    })
    .post('/start', (req, res) => {
        res.render('duel/fight')
    })