import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

app.use(cookieParser());
app.use('/Ping',(req,res)=>{
    req.setEncoding('Pong')
})

//3 route config

app.all("*",()=>{
    res.status(404).send('OOPS!! 4040 page not found')
})


export default app