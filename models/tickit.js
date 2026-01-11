import mongoose from "mongoose"

const tickitSchema= new mongoose.Schema({
    title:String,
    depscription:String,
    status:{type:String, enum:["TODO","IN Progress","Completed","PROBLEM SOLVED"]},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    asignedTo:{type:mongoose.Schema.Types.ObjectId,ref:"user", default:null},
    priority:String,
    deadLine:Date,
    helpFullNotes:String,
    skillesNeeded:[String],
    createAt:{default:Date.now , type:Date}
     
})

export default mongoose.model("tickit",tickitSchema)