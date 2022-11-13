import { Router } from "express";
import * as path from "path";
import { MechRecord } from "../records/mech.record";


export const mechRouter = Router();



mechRouter

    .get('/select', async (req, res) => {
        res.sendFile('test.html', {
            root: path.join(__dirname, '../public/html')
        })
    })
    .post('/', (req, res) => {
        res.send('Dodwanie wojownika')
    })