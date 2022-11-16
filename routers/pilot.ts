import { Router } from "express";
import * as path from "path";
import { PilotRecord } from "../records/pilot.record";


export const PilotRouter = Router();



PilotRouter

    .get('/', async (req, res) => {
        res.sendFile('test.html', {
            root: path.join(__dirname, '../public/html')
        })
    })
    .post('/', (req, res) => {
        res.send('Dodwanie wojownika')
    })