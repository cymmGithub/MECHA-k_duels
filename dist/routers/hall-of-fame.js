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
exports.hallOfFameRouter = void 0;
const express_1 = require("express");
const path = require("path");
const pilot_record_1 = require("../records/pilot.record");
exports.hallOfFameRouter = (0, express_1.Router)();
exports.hallOfFameRouter
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .sendFile('hall-of-fame.html', {
        root: path.join(__dirname, '../public/html'),
    });
}))
    .get('/top-mechs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topPilots = yield pilot_record_1.PilotRecord.listTop(8);
    const data = topPilots.map(pilot => {
        return {
            name: pilot.pilotName,
            wins: pilot.wins,
            mechName: pilot.mechName,
        };
    });
    res
        .status(200)
        .json(data);
}));
//# sourceMappingURL=hall-of-fame.js.map