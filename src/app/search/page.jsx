"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PostCard from "@/components/PostCard";
import { AiOutlineSearch } from "react-icons/ai";

const page = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const searchparams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchparams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("/api/post/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 9,
          order: sortFromUrl || "desc",
          category: categoryFromUrl || "uncategorized",
          searchTerm: searchTermFromUrl || "",
        }),
      });
      
      if (!res.ok) {
        setLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
        setLoading(false);

        if (data.posts && data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [searchparams]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchparams);
    urlParams.set("searchTerm", sidebarData.searchTerm || "");
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const res = await fetch("/api/post/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 9,
        order: sidebarData.sort,
        category: sidebarData.category,
        searchTerm: sidebarData.searchTerm,
        startIndex,
      }),
    });

    if (!res.ok) {
      return;
    }

    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...(data.posts || [])]);
      if (data.posts && data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <div className="lg:w-80 bg-white border-b lg:border-r lg:border-b-0 border-gray-200 lg:min-h-screen shadow-sm">
        <div className="p-6 sticky top-0">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Filter Posts
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Search Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="searchTerm" className="text-sm font-semibold text-gray-700">
                Search Term
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search articles..."
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 placeholder:text-gray-400"
                />
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>

            {/* Sort Select */}
            <div className="flex flex-col gap-2">
              <label htmlFor="sort" className="text-sm font-semibold text-gray-700">
                Sort By
              </label>
              <select
                id="sort"
                value={sidebarData.sort}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-gray-700 cursor-pointer"
              >
                <option value="desc">Latest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>

            {/* Category Select */}
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={sidebarData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-gray-700 cursor-pointer"
              >
                <option value="uncategorized">All Categories</option>
                <option value="javascript">JavaScript</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">Next.js</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 active:scale-95 transition-all duration-300 mt-2"
            >
              Apply Filters
            </button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Post Results
            </h1>
            {posts.length > 0 && (
              <p className="text-gray-600">
                Found {posts.length} {posts.length === 1 ? "post" : "posts"}
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Loading posts...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AiOutlineSearch className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 max-w-md">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && posts.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {/* Show More Button */}
              {showMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleShowMore}
                    className="px-8 py-3 bg-white border-2 border-teal-500 text-teal-600 font-semibold rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Show More Posts
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
