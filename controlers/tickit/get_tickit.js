import Tickit from "../../models/tickit.js";

const getTickit=async(req,res)=>{
    try {
        const tickitId=req.params.id;
        if(req.user.role=="user") {
        const tickit=await Tickit.findOne({_id:tickitId,createdBy:req.user._id})
        .populate("createdBy",["email","name","_id"])
        .populate("asignedTo",["email","name","_id"]);

        if(!tickit){
            return res.status(404).json({message:"tickit not found"});
        }
        return res.status(200).json({tickit})

        }else{
            const tickit=await Tickit.findOne({_id:tickitId})
        .populate("createdBy",["email","name","_id"])
        .populate("asignedTo",["email","name","_id"]);

        if(!tickit){
            return res.status(404).json({message:"tickit not found"});
        }
        return res.status(200).json({tickit})
        }
    } catch (error) {
        console.log("error in tickit fetching time: ", error.message);
        res.status(500).json({ message: error.message });
    }
}
export default getTickit