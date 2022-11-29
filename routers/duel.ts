import { Router } from "express";
import * as path from "path";
import { Arena } from "../records/arena.record";
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
    .post('/start', async (req, res) => {

        const { playerId, enemyId } = req.body;

        const player1 = await PilotRecord.getOne(playerId);
        const player2 = await PilotRecord.getOne(enemyId);

        const arena = new Arena(player1, player2);
        const winner = arena.fight();
        console.log(arena.log);

        winner.wins++;
        winner.update(winner.id)

        res
            .status(200)
            .json(arena.log);


    })