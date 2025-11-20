
import userModel from "../models/userModel"
import { connect } from "../mongoDB/config"


export const createOrUpdateUser=async(id,first_name,last_name,image_url,email_addresses,username)=>{
    try {
        await connect()

        const user=await userModel.findOneAndUpdate(
            {clerkId:id},
            {
                $set:{
                    clerkId:id,
                    firstName:first_name,
                    lastName:last_name,
                    profilePicture:image_url,
                    email:email_addresses[0].email_address,
                    userName:username
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


export const deleteUser=async(id)=>{
    try {
        await connect()
        const deletedUser=await userModel.findOneAndDelete({clerkId:id})
        if(!deletedUser){
            console.log("No user found to delete for clerkId:",id)
        }
        console.log("User deleted successfully")
    } catch (error) {
        console.log("Error deleting user",error)
    }
}