
import jwt from "jsonwebtoken";


const logout = async (req, res) => {
    const authorization=req.headers.authorization.split(" ")[1];
  try {
    if(!authorization){
        return res.status(401).json({ message: "unauthorozed user" });
    }
    jwt.verify(authorization,process.env.JWT_S,(error,data)=>{
        if(error) return res.status(401).json({ message: "unauthorozed user" });
    });
    
    return res.status(200).json({message:"logout successfully"})

  } catch (error) {
    console.log("error in login time: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default logout