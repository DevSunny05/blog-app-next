import PostCard from "@/components/PostCard";
import Link from "next/link";

const ProjectsPage = async () => {
  let posts = [];

  try {
    const baseUrl =
      process.env.URL || process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/post/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 50,
        order: "desc",
      }),
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      posts = data.posts || [];
    }
  } catch (error) {
    console.error("Error loading projects:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col gap-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                All Blog Posts
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx(auto leading-relaxed">
              A comprehensive collection of articles covering every category on
              the blog. Browse through the latest tutorials, guides, and thought
              pieces from across the site.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
              <Link
                href="/search"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 active:scale-95 transition-all duration-300"
              >
                Browse All Categories
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 bg-white border-2 border-purple-200 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/search"
                className="inline-block px-8 py-3 bg-white border-2 border-teal-500 text-teal-600 font-semibold rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Load More Posts
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No posts available yet
            </h2>
            <p className="text-gray-600 mb-6">
              We're working on exciting new content. Check back soon!
            </p>
            <Link
              href="/search"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Blog Posts
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectsPage;