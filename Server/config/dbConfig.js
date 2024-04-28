import mongoose from "mongoose";

mongoose.set('strictQuery',false);

const connectToDB = async() =>{
    try {
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI  || `mongodb://127.0.0.1:27017/lms_pro`
        )
        if(connection){
            console.log(`Connecting to mongoDB: ${connection.host}`)
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectToDB;