import Tickit from "../../models/tickit.js";
import user from "../../models/user.js";

const getAllTickits=async(req,res)=>{
    try {
        
        if(req.user.role=="user"){
            console.log(req.user._id) //695bdd4c222d9dce1632ff23
         const allTickits=await Tickit.find({createdBy:req.user._id}) 
        .populate("createdBy",["email","name","_id"])
        .populate("asignedTo",["email","name","_id"])
        .sort({createAt:-1});
      
        if(!allTickits){
            return res.status(404).json({message:"you do not have any tickit yet"});
        }
        return res.status(200).json({allTickits})
        }
        else{
        const allTickits=await Tickit.find({}) 
        .populate("createdBy",["email","name","_id"])
        .populate("asignedTo",["email","name","_id"])
        .sort({createAt:-1});
        if(!allTickits){
            return res.status(404).json({message:"no tickit found"});
        }
        return res.status(200).json({allTickits})
        }
        
    } catch (error) {
        console.log("error in tickits fetching time: ", error.message);
        res.status(500).json({ message: error.message });
    }
}
export default getAllTickits