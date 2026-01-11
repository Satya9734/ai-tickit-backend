import Tickit from "../../models/tickit.js"
import my_ingest from "../../ingest/client.js"


const add_tickit=async(req,res)=>{
try {
    const {title,depscription}=req.body;
    const createTickit=await Tickit.create({
        title,depscription,createdBy:req.user._id.toString()
    })

    await my_ingest.send({
        name:"tickit/created",
        data:{
            tickitId:createTickit._id.toString()
        }
    })

    return res.status(201).json({message:"tickit create and processing started",createTickit})

} catch (error) {
    console.log("error in tickit creating time: ", error.message);
    res.status(500).json({ message: error.message });
}
}

export default add_tickit