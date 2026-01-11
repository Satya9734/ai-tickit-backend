import Tickit from "../../models/tickit.js"

const mark_done=async(req,res)=>{
    const user=req.user;
try {
    const {id}=req.body;
    const tickitDoc=await Tickit.findOne({_id:id});
    if(!tickitDoc){
        res.status(404).json({message:"tickit not found"});
        return;
    }
    if(tickitDoc.createdBy.toString() !== user._id.toString()){
        res.status(401).json({message:"you cant update it"});
        return;
    }
    await Tickit.findOneAndUpdate({_id:id},{status:"PROBLEM SOLVED"})

    return res.status(201).json({message:"update done"});

} catch (error) {
    console.log("error in tickit mark done time: ", error.message);
    res.status(500).json({ message: error.message });
}
}

export default mark_done