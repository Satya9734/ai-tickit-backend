import my_ingest from "../client.js";
import tickit from "../../models/tickit.js";

const clenar=my_ingest.createFunction(
    {id:"tickit-clener", retries:2},
    {cron:"* * * * *"},
    async()=>{
        console.log("corn run")
        try {
            const clenar=await tickit.deleteMany({status:"PROBLEM SOLVED"});
            return true;
        } catch (error) {
            console.log("clenar function error: ",error.message);
            return false;
        }
    }
)

export default clenar