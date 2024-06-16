import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE)
        console.log('database connected')
        
    } catch (error) {
        console.log('db connection error',error)
        
    }

}