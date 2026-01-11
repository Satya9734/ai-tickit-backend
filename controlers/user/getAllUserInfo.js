import User from "../../models/user.js";

const getAllUserInfo=async(req,res)=>{
    try {
        console.log(req.user.role)
        if(req.user.role!=="admin") return res.status(404).json({ message: "unauthorised access , you cant see also users" });

      const allUsers=await User.find().select("-password");
      return res.status(200).json(allUsers);
    } catch (error) {
        console.log("error in fteching all users time: ", error.message);
        res.status(500).json({ message: error.message });
    }
}

export default getAllUserInfo