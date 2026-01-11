import express from "express"
import signup from "../controlers/user/signup.js"
import login from "../controlers/user/login.js"
import logout from "../controlers/user/logout.js"
import getAllUserInfo from "../controlers/user/getAllUserInfo.js"
import updateUser from "../controlers/user/updateUser.js"
import is_login from "../middlewares/is_login.js"

const userRouts=express.Router()

userRouts.post("/signup",signup);
userRouts.post("/login",login);
userRouts.post("/logout",logout);
userRouts.post("/getAllUserInfo",is_login,getAllUserInfo);
userRouts.post("/updateUser",is_login,updateUser);


export default userRouts