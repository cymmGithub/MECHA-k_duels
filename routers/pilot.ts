import { Router } from "express";
import * as path from "path";
import { PilotRecord } from "../records/pilot.record";
import { ValidationError } from "../utils/error";


export const PilotRouter = Router();



PilotRouter

    .get('/', async (req, res) => {
        res
            .sendFile('pilot-configurator.html', {
                root: path.join(__dirname, '../public/html')
            })
    })
    .get('/random-opponent', async (req, res) => {
        const { playerId } = req.cookies;

        const randomOpponent = await PilotRecord.getRandom(playerId);

        randomOpponent['enemy'] = true;

        res.json(randomOpponent);




    })
    .post('/', async (req, res) => {


        const newPilot = new PilotRecord({
            ...req.body,
            strength: req.body.strength,
            defense: req.body.defense,
            stamina: req.body.stamina,
            agility: req.body.agility,

        });
        await newPilot.insert();

        res
            .cookie('playerId', newPilot.id)
            .status(200)
            .json('Your Pilot has been succesfully registered for tournament')






    })