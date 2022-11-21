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
    .post('/', async (req, res) => {
        console.log(req.body.strength);

        try {
            const newPilot = new PilotRecord({
                ...req.body,
                strength: req.body.strength,
                defense: req.body.defense,
                stamina: req.body.stamina,
                agility: req.body.agility,

            });
            await newPilot.insert();
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res
                    .status(400)
                    .json('Pilot with such a name already exists')
                console.error(error);
            }
            if (error instanceof ValidationError) {
                res
                    .status(400)
                    .json(error.message)
            }
        } finally {
            res
                .status(200)
                .json('Your Pilot has been succesfully registered for tournament')
        }





    })