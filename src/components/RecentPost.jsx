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
  return posts && posts.length > 0 ? (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        No posts available yet. Check back soon!
      </p>
    </div>
  );
};

export default RecentPost;
