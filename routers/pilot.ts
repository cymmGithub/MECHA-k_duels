import { Router } from "express";
import * as path from "path";
import { PilotRecord } from "../records/pilot.record";


export const PilotRouter = Router();



PilotRouter

    .get('/', async (req, res) => {
        res.sendFile('pilot-configurator.html', {
            root: path.join(__dirname, '../public/html')
        })
    })
    .post('/', async (req, res) => {



        const newPilot = new PilotRecord({
            ...req.body,
            strength: Number(req.body.strength),
            defense: Number(req.body.defense),
            stamina: Number(req.body.stamina),
            agility: Number(req.body.agility),

        });
        await newPilot.insert()
        res.sendFile('pilot-added.html', {
            root: path.join(__dirname, '../public/html')
        })



    })