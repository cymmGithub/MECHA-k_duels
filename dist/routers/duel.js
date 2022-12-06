"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.duelRouter = void 0;
const express_1 = require("express");
const path = require("path");
const arena_record_1 = require("../records/arena.record");
const pilot_record_1 = require("../records/pilot.record");
exports.duelRouter = (0, express_1.Router)();
exports.duelRouter
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
        const winner = yield pilot_record_1.PilotRecord.getOne(winnerCookie.id);
        const timeLeft = winnerCookie.createdAt + 10 - new Date().getTime() / 1000;
        res.status(400);
        res.json({
            message: `Your mech is still resting after last duel. Wait ${Math.round(timeLeft)} s.`,
            winner
        });
    }
    const player = yield pilot_record_1.PilotRecord.getOne(playerId);
    res
        .status(200)
        .json(player);
}))
    .post('/start', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId, enemyId } = req.body;
    const player1 = yield pilot_record_1.PilotRecord.getOne(playerId);
    const player2 = yield pilot_record_1.PilotRecord.getOne(enemyId);
    const arena = new arena_record_1.Arena(player1, player2);
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