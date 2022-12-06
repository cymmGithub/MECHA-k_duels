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
exports.PilotRouter = void 0;
const express_1 = require("express");
const path = require("path");
const pilot_record_1 = require("../records/pilot.record");
const error_1 = require("../utils/error");
exports.PilotRouter = (0, express_1.Router)();
exports.PilotRouter
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .sendFile('pilot-configurator.html', {
        root: path.join(__dirname, '../public/html'),
    });
}))
    .get('/random-opponent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId, winnerCookie } = req.cookies;
    if (winnerCookie) {
        const timeLeft = (winnerCookie.createdAt + 10) - new Date().getTime() / 1000;
        throw new error_1.ValidationError(`Your Mech is still resting after last fight. Wait ${timeLeft} s.`);
    }
    const randomOpponent = yield pilot_record_1.PilotRecord.getRandom(playerId);
    randomOpponent.enemy = true;
    res
        .cookie('enemyId', randomOpponent.id)
        .json(randomOpponent);
}))
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPilot = new pilot_record_1.PilotRecord(Object.assign(Object.assign({}, req.body), { strength: req.body.strength, defense: req.body.defense, stamina: req.body.stamina, agility: req.body.agility }));
    yield newPilot.insert();
    res
        .cookie('playerId', newPilot.id)
        .status(200)
        .json('Your Pilot has been succesfully registered for tournament');
}));
//# sourceMappingURL=pilot.js.map