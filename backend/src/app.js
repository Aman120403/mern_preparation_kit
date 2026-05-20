import express from 'express'
import router from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import errorHandler from './middleware/err.middleware.js';

const app = express();
app.use(cookieParser());

//basic configurations
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));

app.use("/api/auth", router);
app.use(errorHandler);


app.get('/', (req,res)=>{
    res.status(200).json({message:"Hi I am running"});
})

export default app;