var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import * as path from "path";
import { Arena } from "../records/arena.record.js";
import { PilotRecord } from "../records/pilot.record.js";
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
    });
})
    .get('/player', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId, winnerCookie, } = req.cookies;
    if (winnerCookie) {
        const winner = yield PilotRecord.getOne(winnerCookie.id);
        const timeLeft = winnerCookie.createdAt + 10 - new Date().getTime() / 1000;
        res.status(400);
        res.json({
            message: `Your mech is still resting after last duel. Wait ${Math.round(timeLeft)} s.`,
            winner
        });
    }
    const player = yield PilotRecord.getOne(playerId);
    res
        .status(200)
        .json(player);
}))
    .post('/start', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId, enemyId } = req.body;
    const player1 = yield PilotRecord.getOne(playerId);
    const player2 = yield PilotRecord.getOne(enemyId);
    const arena = new Arena(player1, player2);
    const winner = arena.fight();
    winner.wins++;
    winner.update(winner.id);
    const winnerCookie = {
        id: winner.id,
        createdAt: new Date().getTime() / 1000,
    };
    res
        .cookie('winnerCookie', winnerCookie, {
        maxAge: 10 * 1000,
    })
        .status(200)
        .json({
        winner,
        log: arena.log
    });
}));
//# sourceMappingURL=duel.js.map