import CallToAction from "@/components/CallToAction";
import RecentPost from "@/components/RecentPost";
import Link from "next/link";

export default async function Home() {
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
        limit: 9,
        order: "desc",
      }),
      cache: "no-store",
    });

    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting post", error);
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="flex flex-col gap-6 md:gap-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Welcome to My Blog
              </span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover a variety of articles and tutorials on topics such as web
              development, software engineering, and programming languages. All brought to
              you through a blog built with{" "}
              <a
                className="text-teal-500 hover:text-teal-600 font-semibold transition-colors"
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </a>{" "}
              and modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
              <Link
                href="/search"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 active:scale-95 transition-all duration-300"
              >
                Explore All Posts
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 bg-white border-2 border-purple-200 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <CallToAction />
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col gap-8">
            <div className="text-center mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Recent Articles
              </h2>
              <p className="text-gray-600 text-lg">
                Stay updated with our latest posts and tutorials
              </p>
            </div>
            
            <div >
              <RecentPost limit={9} />
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/projects"
                className="inline-block px-8 py-3 bg-white border-2 border-teal-500 text-teal-600 font-semibold rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
