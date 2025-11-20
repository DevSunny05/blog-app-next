import { createOrUpdateUser, deleteUser } from '@/lib/actions/userAction'
import { createClerkClient } from "@clerk/backend";
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data
    const eventType = evt?.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    if(eventType ==="user.created" || eventType ==="user.updated"){
        const {id,first_name,last_name,image_url,email_addresses,username}=evt?.data

        try {
          const user=await createOrUpdateUser(id,first_name,last_name,image_url,email_addresses,username)

          if(user && eventType==="user.created"){
            try {
              await clerkClient.users.updateUserMetadata(id,{
                publicMetadata:{
                  userMongoId:user._id,
                  isAdmin:user.isAdmin
                }
              })
            } catch (error) {
              console.log("Error updating user metadata",error)
              return new Response("Error updating user metadata", { status: 400 })
            }
          }
        } catch (error) {
          console.log("Error creating or Updating user",error)
          return new Response("Error creating or Updating user", { status: 400 })

        }
    }

    if(eventType==='user.deleted'){
      try {
        await deleteUser(id)
      } catch (error) {
        console.log("Error deleting user",error)
    return new Response("Error deleting user", { status: 400 })

      }
    }

    return new Response('Webhook received', { status: 200 })
  } catch (error) {
    console.error('Error verifying webhook:', error)
    return new Response('Error verifying webhook', { status: 400 })
  }
}