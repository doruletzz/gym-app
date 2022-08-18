"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const router = express_1.default.Router();
const User = mongoose_1.default.model('User');
const TOKEN = '1';
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req);
    User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
        .then((user) => {
        // TODO: generate Token, throw error if token generation failed
        if (!user) {
            return res.status(422).json({ error: 'Wrong Credentials' });
        }
        // return res.json({ token: 'aa' });
        console.log(user);
        const token = jsonwebtoken_1.default.sign({ user: user.username }, config_1.SECRET);
        return res.cookie('token', token, { httpOnly: true }).json({
            token,
        });
    })
        .catch((err) => res.status(422).json(err));
}));
router.put('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(500).json({ message: 'NOT IMPLMENETED' });
}));
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.age = req.body.age;
    user.gender = req.body.gender;
    user.height = req.body.height;
    user.level = req.body.level;
    user.save()
        .then(() => {
        // TODO: generate Token, throw error if token generation failed
        console.log(user);
        return res.json({ token: TOKEN });
    })
        .catch(next);
}));
exports.UserController = router;
