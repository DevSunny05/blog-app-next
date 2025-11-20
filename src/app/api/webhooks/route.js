

import { createorUpdateUser, deleteUser } from "@/lib/actions/userAction";
import { createClerkClient } from "@clerk/backend";
import { verifyWebhook } from "@clerk/nextjs/webhooks";


const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data;
    const eventType = evt?.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const { first_name, last_name, image_url, email_addresses,username } = evt?.data;

      try {
        const user = await createorUpdateUser(
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
          username
        );
        if (user && eventType === "user.created") {
          try {
            await clerkClient.users.updateUserMetadata(id, {
              publicMetadata: {
                userMongoId: user._id.toString(),
                isAdmin:user.isAdmin // Convert ObjectId to string
              },
            });
            console.log("Successfully saved MongoDB ID to Clerk:", user._id.toString());
          } catch (error) {
            console.error("Error updating Clerk metadata:", error);
          }
        }
      } catch (error) {
        console.log(error);
      }
      console.log("userId:", evt.data.id);
    }

    if (eventType === "user.deleted") {
      try {
        await deleteUser(id);
      } catch (error) {
        console.log(error);
        return new Response("Error:Could not delete user", { status: 400 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
