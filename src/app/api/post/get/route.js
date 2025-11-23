import postModel from "@/lib/models/postModel"
import { connect } from "@/lib/mongoDB/config"



import { NextResponse } from "next/server"

export const POST=async(req)=>{
    try {
        await connect()
        const data =await req.json()
        
        const startIndex=parseInt(data.startIndex) || 0
        const limit =parseInt(data.limit) || 9
        const sortDirection=data.order ==='asc'?1:-1

        const posts=await postModel.find({
            ...(data.userId && {userId:data.userId}),
            ...(data.category && {category:data.category}),
            ...(data.slug && {slug:data.slug}),
            ...(data.postId  && {_id:data.postId}),
            ...(data.searchTerm && {
                $or:[
                    {title:{$regex:data.searchTerm,$options:'i'}},
                    {content:{$regex:data.searchTerm,$options:'i'}},

                ]
            })
        }).sort({updatedAt:sortDirection})
        .skip(startIndex)
        .limit(limit)

        const totalPosts=await postModel.countDocuments()

        const now=new Date()
        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthPosts=await postModel.countDocuments({
            createdAt:{$gte:oneMonthAgo}
        })

        return NextResponse.json({posts,totalPosts,lastMonthPosts},{status:200})

    } catch (error) {
        console.log("Error getting posts",error)
        return NextResponse.json(
            { error: "Failed to get posts", details: error.message },
            { status: 500 }
        )
    }

}