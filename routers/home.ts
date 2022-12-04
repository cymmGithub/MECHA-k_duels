import { Router } from "express";
import * as path from "path";


export const homeRouter = Router();



homeRouter

    .get('/', async (req, res) => {

        res
            .sendFile('index.html', {
                root: path.join(__dirname, '../public/html'),
            })

    })