import userModel from "../models/userModel";
import { connect } from "../mongoDB/config";


export const createorUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connect();

    const user = await userModel.findOneAndUpdate(
      {
        clerkId: id,
      },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
          userName:username
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    return user;
  } catch (error) {
    console.log("Error:could not create or update user", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await userModel.findOneAndDelete({ clerkId: id });
    console.log("User deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
