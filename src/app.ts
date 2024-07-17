import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cors from "cors"
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import Stripe from "stripe";
import config from './app/config';
const app : Application = express();

app.use(express.json());
const stripe = new Stripe(config.STRIPE_SECRET_KEY as string);

// // CORS configuration
// app.use(cors({
//     origin: 'https://zfitx.vercel.app', // Allow requests from this origin
//     methods: ['GET', 'POST'], // Allow only GET and POST requests
//     allowedHeaders: ['Content-Type'], // Allow the Content-Type header
//   }));

app.use(cors());

app.use('/api/v1',router)

const apiCheck = async (req:Request,res:Response)=>{
    const message = "ZFitX server api running";
    res.send(message)
}


app.get('/api',apiCheck);

app.post('/api/v1/create-payment-intent',async(req,res)=>{
const {amount}=req.body;

try{
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency:'usd',
    })

    res.send({
        clientSecret:paymentIntent.client_secret,
    });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}catch(error:any){
    res.status(400).send({
       error: error.message,
    })
}
})

app.use(globalErrorHandler)
app.use(notFound)


export default app ;