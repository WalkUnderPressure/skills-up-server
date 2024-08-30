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
// Working version "json-server": "^0.17.0"
const json_server_1 = __importDefault(require("json-server"));
const deleteFieldFrom_1 = __importDefault(require("./lib/deleteFieldFrom"));
const __db__1 = __importDefault(require("./db/__db__"));
const DB_DATA = (0, __db__1.default)();
const server = json_server_1.default.create();
const router = json_server_1.default.router(DB_DATA);
server.use(json_server_1.default.defaults({}));
server.use(json_server_1.default.bodyParser);
// Small delay for real server behavior imitation
server.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((res) => {
        setTimeout(res, 2000);
    });
    next();
}));
// Sign in endpoint
server.post('/sign-in', (req, res) => {
    try {
        const { username, password } = req.body;
        const { users = [] } = DB_DATA;
        const userFromBd = users.find((user) => user.username === username && user.password === password);
        if (userFromBd) {
            // remove user password before send to client
            (0, deleteFieldFrom_1.default)(userFromBd, 'password');
            return res.json(userFromBd);
        }
        return res.status(403).json({ message: 'User not found' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
// Check user authorization
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'Authorization error!' });
    }
    next();
});
server.use(router);
// start dev server
const PORT = 7000;
server.listen(PORT, () => {
    console.log(`Server is running\nLocal: http://localhost:${PORT}`);
});
