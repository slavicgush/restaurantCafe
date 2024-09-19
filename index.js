import  express  from "express";
import { dirname } from 'path';
import  morgan  from 'morgan';
import { fileURLToPath } from "url";
import { router as itemRouter } from "./resto/index.js";
import auth from './auth.js';
import { ensureLoggedIn } from 'connect-ensure-login';

const app = express();

app.set('views', `${dirname(fileURLToPath(import.meta.url))}/resto/views`);
app.set('view engine','ejs');
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
app.use(express.urlencoded({ extended: false }));

auth(app);
app.use(morgan('dev'));
app.use('/items',ensureLoggedIn('/login.html'),itemRouter);
app.get('/',(req,res) => res.redirect('/items'));


app.listen(8080, () => {
  console.log('Server listening at port 8080');
});