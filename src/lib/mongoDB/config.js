import mongoose from 'mongoose'

let initialized=false

export const connect=async()=>{
    mongoose.set('strictQuery',true)
    if(initialized){
        console.log("Already connected to MongoDB")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'blog-app'
        })
        initialized=true
    } catch (error) {
        console.log("Error connecting to DB",error)
    }
}

