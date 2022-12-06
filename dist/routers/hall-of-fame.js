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
import path from "path";
import { PilotRecord } from "../records/pilot.record.js";
export const hallOfFameRouter = Router();
hallOfFameRouter
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .sendFile('hall-of-fame.html', {
        root: path.join(__dirname, '../public/html'),
    });
}))
    .get('/top-mechs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topPilots = yield PilotRecord.listTop(8);
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