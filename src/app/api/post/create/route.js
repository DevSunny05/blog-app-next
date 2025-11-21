import postModel from "@/lib/models/postModel"
import { connect } from "@/lib/mongoDB/config"
import { auth } from "@clerk/nextjs/server"
import { createClerkClient } from "@clerk/backend"
import { NextResponse } from "next/server"

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
})

export const POST = async (req) => {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized: User not authenticated" },
                { status: 401 }
            )
        }

        // Get full user object with publicMetadata
        const user = await clerkClient.users.getUser(userId)

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized: Could not retrieve user data" },
                { status: 401 }
            )
        }

        await connect()
        const data = await req.json()

        // Validate required fields
        if (!data.title || !data.content || !data.imageUrls) {
            return NextResponse.json(
                { error: "Missing required fields: title, content, and imageUrls are required" },
                { status: 400 }
            )
        }

        // Check authorization
        if (!user.publicMetadata || 
            user.publicMetadata.userMongoId !== data.userMongoId || 
            user.publicMetadata.isAdmin !== true) {
            return NextResponse.json(
                { error: "Unauthorized: Admin access required" },
                { status: 401 }
            )
        }

        // Generate slug from title
        const slug = data.title
            .toLowerCase()
            .trim()
            .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special chars but keep spaces and hyphens
            .replace(/\s+/g, '-') // Replace one or more spaces with a single hyphen
            .replace(/-+/g, '-') // Replace multiple consecutive hyphens with a single hyphen
            .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens

        // Create new post
        const newPost = new postModel({
            userId: user.publicMetadata.userMongoId,
            title: data.title,
            content: data.content,
            imageUrls: data.imageUrls,
            category: data.category || "uncategorized",
            slug: slug
        })

        await newPost.save()
        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        console.log("Error:could not create post", error)
        return new Response("Internal server error", { status: 500 })
    }
}