import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cors from "cors"
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
const app : Application = express();

app.use(express.json());


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

app.use(globalErrorHandler)
app.use(notFound)


export default app ;