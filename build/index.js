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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const IS_DEV = Boolean(process.env.NODE_ENV === 'dev');
let dotEnvConfig = {};
if (IS_DEV) {
    dotEnvConfig.path = path_1.default.resolve(__dirname, '..', '.env');
}
// setup env variables
dotenv_1.default.config(dotEnvConfig);
// Important load db first to apply mongoose plugins before model will be loaded
const db_1 = __importDefault(require("./db"));
// then import schemas
const ProfilesRouter_1 = __importDefault(require("./api/ProfilesRouter"));
const CommentsRouter_1 = __importDefault(require("./api/CommentsRouter"));
const PostsRouter_1 = __importDefault(require("./api/PostsRouter"));
const AuthRouter_1 = __importDefault(require("./api/AuthRouter"));
// Import middlewares
const logger_1 = __importDefault(require("./middlewares/logger"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Add requests logger
app.use(logger_1.default);
app.get('/', (req, res) => {
    return res.json({ message: "Welcome! 'skills-up-server' is working fine!" });
});
// temporary api-point
app.get("/favicon.ico", (req, res) => {
    return res.status(204).end(); // No content, but successful response
});
app.use('/auth', AuthRouter_1.default);
app.use(auth_1.default).use('/profiles', ProfilesRouter_1.default);
app.use(auth_1.default).use('/comments', CommentsRouter_1.default);
app.use(auth_1.default).use('/posts', PostsRouter_1.default);
const PORT = process.env.PORT || 7000;
function startup() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.default)();
        app.listen(PORT, () => {
            console.log(`>>> Server is running at: http://localhost:${PORT}`);
        });
    });
}
if (IS_DEV) {
    // start server
    startup();
}
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!IS_DEV) {
        yield startup();
    }
    app(req, res); // Pass the request and response to the Express app
});
