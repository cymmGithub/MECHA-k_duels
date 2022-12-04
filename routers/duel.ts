import { Router } from "express";
import * as path from "path";
import { Arena } from "../records/arena.record";
import { PilotRecord } from "../records/pilot.record";
import { WinnerCookieData } from "../ts/interfaces/cookie";


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
                root: path.join(__dirname, '../public/html'),
            })

    })
    .get('/player', async (req, res) => {
        const { playerId, winnerCookie, } = req.cookies as {
            playerId: string,
            winnerCookie: WinnerCookieData,
        }

        if (winnerCookie) {
            const winner = await PilotRecord.getOne(winnerCookie.id);
            const timeLeft = winnerCookie.createdAt + 10 - new Date().getTime() / 1000;

            res.status(400);
            res.json({
                message: `Your mech is still resting after last duel. Wait ${Math.round(timeLeft)} s.`,
                winner
            });
        }

        const player = await PilotRecord.getOne(playerId);

        res
            .status(200)
            .json(
                player,
            );

    })
    .post('/start', async (req, res) => {

        const { playerId, enemyId } = req.body;

        const player1 = await PilotRecord.getOne(playerId);
        const player2 = await PilotRecord.getOne(enemyId);

        const arena = new Arena(player1, player2);
        const winner = arena.fight();

        winner.wins++;
        winner.update(winner.id);

        const winnerCookie = {
            id: winner.id,
            createdAt: new Date().getTime() / 1000,
        }

        res
            .cookie('winnerCookie', winnerCookie, {
                maxAge: 10 * 1000,
            })
            .status(200)
            .json({
                winner,
                log: arena.log
            });


    });