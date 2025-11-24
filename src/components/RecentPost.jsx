import React from "react";
import PostCard from "./PostCard";

const RecentPost = async ({limit}) => {
  let posts = null;

  try {
    const baseUrl =
      process.env.URL || process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const result = await fetch(`${baseUrl}/api/post/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: limit,
        order: "desc",
      }),
      cache: "no-store",
    });

    const data=await result.json()
    posts=data.posts

  } catch (error) {
    console.log("Error geting posts",error)
  }
  return(
    <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
            {posts && posts.map((post)=><PostCard key={post._id} post={post}/>)}
        </div>
    </div>
  )
};

export default RecentPost;
