"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const urlParams=new URLSearchParams(searchParams)
    urlParams.set("searchTerm",searchTerm)
    const searchQuery=urlParams.toString()
    router.push(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 max-w-6xl mx-auto">
      <Link
        href="/"
        className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-300 cursor-pointer tracking-tight"
      >
        Blog App
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="hidden md:flex items-center relative group">
            <input
            type="text"
            placeholder="Search articles..."
            className="pl-4 pr-12 py-2 w-64 rounded-md border-2 border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-purple-200 focus:ring-1 focus:ring-purple-200 transition-all duration-300 shadow-sm focus:shadow-md placeholder:text-gray-400 text-gray-700"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <AiOutlineSearch className="absolute right-4 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300 text-xl" />
        </div>
      </form>

      <nav className="hidden md:flex items-center gap-2">
        <Link
          href="/"
          className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            pathname === "/"
              ? "text-blue-600 bg-gray-100 shadow-md shadow-purple-200"
              : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            pathname === "/about"
              ? "text-blue-600 bg-gray-100 shadow-md shadow-purple-200"
              : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          }`}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            pathname === "/projects"
              ? "text-blue-600 bg-gray-100 shadow-md shadow-purple-200"
              : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          }`}
        >
          Projects
        </Link>
      </nav>

      <SignedOut>
        <Link href="/sign-in">
          {/* <SignInButton> */}
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 active:scale-95 transition-all duration-300">
            Sign In
          </button>
          {/* </SignInButton> */}
        </Link>
      </SignedOut>
      <SignedIn>
        <div className="cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-all duration-300 transform scale-150">
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
};

export default Header;
