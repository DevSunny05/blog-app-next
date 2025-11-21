import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    imageUrls:{
        type:String,
        required:true
    },category:{
        type:String,
       default:"uncategorized"
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
   
}, {timestamps:true})

const postModel=mongoose.models.post || mongoose.model("post",postSchema)

export default postModel