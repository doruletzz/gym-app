import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/fitness-plan');
mongoose.set('debug', true);
import './model/User';

import express, { Request } from 'express';
import cors from 'cors';
import Controller from './controller';

import cookieParser from 'cookie-parser';

import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors());
app.use(
	express.json({
		type: '*/*',
	})
);

app.use(Controller);

// app.get('/', (req, res) => {
// 	res.send('Hello World');
// });

// app.post('/plan', (req, res) => {
// 	res.send('RECEIVED');
// });

// app.post(
// 	'/login',
// 	(req: Request<{}, {}, { username: string; password: string }, {}>, res) => {
// 		console.log(req.body);

// 		res.send('1');
// 	}
// );

// app.post('/register', (req, res) => {
// 	console.log(req.params);

// 	res.send('1');
// });

const PORT = 4000;

console.log(`app running on http://localhost:${PORT}`);
app.listen(PORT);
