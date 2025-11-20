import mongoose from "mongoose";


const userSchema=mongoose.Schema({
    clerkId:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    firstName:{
        type:String,
        require:true,
       
    },
    lastName:{
        type:String,
        require:true,
        
    },
    userName:{
        type:String,
        require:true,
        unique:true
    },
    profilePicture:{
        type:String,
        require:false,
        
    },
    isAdmin:{
        type:Boolean,
       default:false
      
    },
},{timestamps:true})

const userModel=mongoose.model("user",userSchema)

export default userModel