import jwt from "jsonwebtoken"

const is_login=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    if(!token){
      return res.status(401).json({ message: "unauthorozed user" });
    }
try {
    const user=jwt.verify(token,process.env.JWT_S);
    req.user=user;
    next();
    
} catch (error) {
    return res.status(401).json({ message: "unauthorozed user" });
}
}

export default is_login;