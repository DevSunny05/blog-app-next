import CallToAction from "@/components/CallToAction";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  // Await params in Next.js 15
  const { slug } = await params;
  let post = null;

  try {
    const baseUrl = process.env.URL || process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const result = await fetch(`${baseUrl}/api/post/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: slug,
      }),
      cache: "no-store",
    });
    
    if (!result.ok) {
      throw new Error(`Failed to fetch post: ${result.status}`);
    }
    
    const data = await result.json();
    post = data.posts && data.posts[0] ? data.posts[0] : null;
  } catch (error) {
    console.error("Error fetching post:", error);
    post = { title: "failed to load post" };
  }
  
  if (!post || post.title === "failed to load post") {
    return (
      <main className="min-h-screen max-w-6xl flex flex-col p-3">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  }
  return (
    <main className="min-h-screen max-w-6xl mx-auto flex flex-col p-3">
      <h1>{post && post.title}</h1>

      <Link
        href={`/search?category=${post?.category || ""}`}
        className="self-center mt-5"
      >
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          {post && post.category}
        </button>
      </Link>

      {post?.imageUrls && (
        <Image
          src={post.imageUrls}
          alt={post.title || "Post image"}
          width={1000}
          height={1000}
          className="w-full max-h-[600px] object-cover rounded-lg shadow-sm mt-10 p-3"
        />
      )}

      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content "
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction post={post}  />
      </div>
    </main>
  );
};

export default page;
