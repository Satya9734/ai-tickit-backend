import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    name:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, default:"user", enum:["user","admin","moderetor"]},
    skills:[String],
    createAt:{default:Date.now , type:Date}
})

export default mongoose.model("user",userSchema)