import * as express from "express";
import 'express-async-errors';
import * as methodOverride from "method-override";
import { duelRouter } from "./routers/duel";
import { hallOfFameRouter } from "./routers/hall-of-fame";
import { homeRouter } from "./routers/home";
import { PilotRouter } from "./routers/pilot";







const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));


app.use('/', homeRouter);
app.use('/pilot', PilotRouter);
app.use('/hall-of-fame', hallOfFameRouter)
app.use('/duel', duelRouter);
// app.use(handleError);



app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');

});

