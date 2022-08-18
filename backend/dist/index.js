"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost/fitness-plan');
mongoose_1.default.set('debug', true);
require("./model/User");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controller_1 = __importDefault(require("./controller"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
let app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json({
    type: '*/*',
}));
app.use(controller_1.default);
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
