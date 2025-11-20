
import userModel from "../models/userModel"
import { connect } from "../mongoDB/config"


export const createOrUpdateUser=async(id,first_name,last_name,image_url,email_addresses,username)=>{
    try {
        await connect()

        const user=await userModel.findOneAndUpdate(
            {clerkId:id},
            {
                $set:{
                    firstName:first_name,
                    lastName:last_name,
                    profilePicture:image_url,
                    email:email_addresses[0].email_address,
                    username
                }
            },{
                new:true,
                upsert:true
            }
        )
        return user

    } catch (error) {
        console.log("Error creating and updating user",error)
    }

}