import Link from "next/link";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="group flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white border border-teal-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden mx-auto">
      <Link href={`/post/${post.slug}`} className="relative w-full">
        <div className="relative w-full h-56 sm:h-60 lg:h-64 overflow-hidden">
          <img
            src={post.imageUrls}
            alt={`Cover image for ${post.title}`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-3 text-xs font-semibold text-teal-600 uppercase tracking-wide">
          <span className="px-3 py-1 bg-teal-50 rounded-full">
            {post.category || "Uncategorized"}
          </span>
          <span className="text-gray-400">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {post.title}
        </h3>

        <div className="mt-auto">
          <Link
            href={`/post/${post.slug}`}
            className="inline-flex items-center justify-center w-full px-4 py-3 border border-teal-500 text-teal-600 font-semibold rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-300"
          >
            Read Article
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
