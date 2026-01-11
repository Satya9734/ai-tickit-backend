import mongoose from "mongoose";

const db_conection=async()=>{
try {
    const db_conection=
    await mongoose.connect(`mongodb+srv://${process.env.name}:${process.env.password}@cluster0.8rkic.mongodb.net/AItickitDB?retryWrites=true&w=majority`);
    console.log("database conected");
} catch (error) {
    console.log("error in database conection : ",error)
}
}

export default db_conection