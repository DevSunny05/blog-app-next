import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col gap-8 p-8 md:p-16 px-4 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            About This Blog
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Learn more about our mission and what we do
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Mission Section */}
          <section className="bg-white/60 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to our blog! We're dedicated to sharing knowledge and insights about web development, 
              software engineering, and programming. Our goal is to help developers at all levels learn, 
              grow, and stay updated with the latest trends and best practices in the tech industry.
            </p>
          </section>

          {/* What We Do Section */}
          <section className="bg-white/60 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              What We Do
            </h2>
            <div className="flex flex-col gap-4 text-gray-600">
              <p className="leading-relaxed">
                We publish articles and tutorials covering a wide range of topics including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Web Development (JavaScript, React, Next.js)</li>
                <li>Software Engineering Best Practices</li>
                <li>Programming Languages and Frameworks</li>
                <li>Development Tools and Technologies</li>
                <li>Tips and Tricks for Developers</li>
              </ul>
            </div>
          </section>

          {/* Technology Stack Section */}
          <section className="bg-white/60 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Built With
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              This blog is built with modern technologies to provide the best user experience:
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                Next.js
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                React
              </span>
              <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg text-sm font-medium">
                MongoDB
              </span>
              <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                Clerk
              </span>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Ready to explore our content?
            </p>
            <Link
              href="/search"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all duration-300"
            >
              Browse All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;