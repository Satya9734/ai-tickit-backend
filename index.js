import express from "express"
import dotenv from "dotenv"
import db_conection from "./db_conection.js";
import cors from "cors"
import {serve} from "inngest/express"
import userRouts from "./routs/userRouts.js";
import tickitRouts from "./routs/tickitRouts.js";
import my_ingest from "./ingest/client.js";

import on_tickit_create from "./ingest/functions/on_tickit_create.js";
import user_welcome_email from "./ingest/functions/user_welcome_email.js";
import clenar from "./ingest/functions/clenar.js"
process.env.OPENROUTER_BROWSER = "false";


//env configaration
dotenv.config();

//express 
const app=express();

//middleware
app.use(cors())
app.use(express.json())


//routs
app.get("/",(req,res)=>{
    res.json("hello welcome...")
})
app.use("/api/auth",userRouts)
app.use("/api/tickit",tickitRouts)

app.use("/api/inngest",serve({
    client:my_ingest,
    functions:[on_tickit_create,user_welcome_email,clenar]
}))

//database conection
db_conection()

app.listen(3000,()=>{
    console.log("app listen at 3000")
})