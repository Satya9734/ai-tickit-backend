import express from "express"
import add_tickit from "../controlers/tickit/add_tickit.js"
import is_login from "../middlewares/is_login.js"
import getAllTickits from "../controlers/tickit/get_all_tickits.js"
import getTickit from "../controlers/tickit/get_tickit.js"
import mark_done from "../controlers/tickit/mark_done.js"

const tickitRouts=express.Router()

tickitRouts.get("/",is_login,getAllTickits);
tickitRouts.get("/:id",is_login,getTickit);
// tickitRouts.get("/:id",is_login,getTickit);
tickitRouts.post("/",is_login,add_tickit);
tickitRouts.post("/update",is_login,mark_done);

export default tickitRouts;