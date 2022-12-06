import * as express from 'express';
import 'express-async-errors';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import { duelRouter } from './routers/duel';
import { hallOfFameRouter } from './routers/hall-of-fame';
import { homeRouter } from './routers/home';
import { PilotRouter } from './routers/pilot';
import { handleError } from './utils/error';

const app = express();

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/', homeRouter);
app.use('/pilot', PilotRouter);
app.use('/hall-of-fame', hallOfFameRouter);
app.use('/duel', duelRouter);
app.use(handleError);

app.listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => {
  console.log('Server is running...');
});
