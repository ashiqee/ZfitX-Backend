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
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY);
// // CORS configuration
// app.use(cors({
//     origin: 'https://zfitx.vercel.app', // Allow requests from this origin
//     methods: ['GET', 'POST'], // Allow only GET and POST requests
//     allowedHeaders: ['Content-Type'], // Allow the Content-Type header
//   }));
app.use((0, cors_1.default)({
    // origin: 'http://localhost:5173', 
    origin: 'https://zfitx.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use('/api/v1', routes_1.default);
const apiCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = "ZFitX server api running";
    res.send(message);
});
app.get('/api', apiCheck);
app.post('/api/v1/create-payment-intent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).send({
            error: error.message,
        });
    }
}));
app.use(globalErrorhandler_1.default);
app.use(notFound_1.default);
exports.default = app;
