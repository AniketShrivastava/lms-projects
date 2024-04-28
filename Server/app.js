import express from "express"
config();
import cors from "cors"
import cookieParser from "cookie-parser";
import { config } from "dotenv";


// import {UserRegister}  from "./controllers/user.controller.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))
app.use(morgan('dev'))

app.use(cookieParser());
// Server Status Check Route
app.get('/ping',(_req,res)=>{
    res.send('Pong')
})

//3 route config
// const userRoutes = require("./routes/user.routes")
import userRoutes  from "./routes/user.routes.js";

app.use('/api/v1/register',userRoutes);

app.use(errorMiddleware)

app.all("*",()=>{
    res.status(404).send('OOPS!! 4040 page not found')
})


export default app