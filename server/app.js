import  express  from "express";
import cors from "cors";
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser';

import userRouter from "./routes/userRouter.js";
import accountRouter from "./routes/Account.routes.js"
import prerouter from "./routes/PreAccounts.routes.js";
import authRouter from "./routes/Auth.routes.js";

export const app = express()

app.get('/', (_req , res) =>{
    res.send('<h1>Hola Backend</h1>')
})

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())



app.use("/cerberus/users", userRouter)
app.use("/cerberus/preaccounts", prerouter)
app.use("/cerberus/accounts", accountRouter)
app.use("/cerberus/auth", authRouter)

