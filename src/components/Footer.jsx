import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand Section */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
            >
              Blog App
            </Link>
            <p className="text-gray-600 text-sm">
              Discover articles and tutorials on web development, software engineering, and programming.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-300 text-sm"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-300 text-sm"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-300 text-sm"
              >
                Projects
              </Link>
              <Link
                href="/search"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-300 text-sm"
              >
                All Posts
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/search?category=javascript"
                className="text-gray-600 hover:text-teal-500 transition-colors duration-300 text-sm"
              >
                JavaScript
              </Link>
              <Link
                href="/search?category=reactjs"
                className="text-gray-600 hover:text-teal-500 transition-colors duration-300 text-sm"
              >
                ReactJS
              </Link>
              <Link
                href="/search?category=nextjs"
                className="text-gray-600 hover:text-teal-500 transition-colors duration-300 text-sm"
              >
                NextJS
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm text-center md:text-left">
            © {currentYear} Blog App. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-purple-600 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/"
              className="hover:text-purple-600 transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;