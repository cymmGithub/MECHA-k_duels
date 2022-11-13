import { Router } from "express";


export const duelRouter = Router();



duelRouter

    .get('/fight-form', (req, res) => {
        res.render('duel/fight-form')
    })
    .post('/fight', (req, res) => {
        res.render('duel/fight')
    })