import User from "../../models/user.js";

const updateUser=async(req,res)=>{
    try {
        const {skills=[],role,email,name}=req.body;
    const user=req.user;

    if(user.role!=="admin"){
        return res.status(401).json({ message: "you cant update, unauthorozed user" });
    }

    const is_user_present=await User.findOne({email});
    if(!is_user_present) return res.status(404).json({ message: "user not found" });

    const update=await User.updateOne(
        {email},
        {
            skills: skills.length>0 ? skills : is_user_present.skills, role, name
        }
    )
    res.status(201).json({message:"updated successfully"})
    } catch (error) {
        console.log("error in updating time: ", error.message);
    res.status(500).json({ message: error.message });
    }
}

export default updateUser