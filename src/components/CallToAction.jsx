import Image from "next/image";
import React from "react";

import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border border-amber-200">
      <div className="flex flex-col flex-1 justify-center text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Want to learn more about <span className="text-teal-600">JavaScript</span>?
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
          Check out our resources with 100 JavaScript projects to enhance your skills and build amazing applications.
        </p>
        <Link
          href="/projects"
          className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-amber-500 hover:to-orange-600 transition-all duration-300 w-fit mx-auto lg:mx-0"
        >
          100 JavaScript Projects
        </Link>
      </div>

      <div className="flex-1 w-full lg:w-auto">
        <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center border-2 border-amber-200 shadow-inner">
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <p className="text-gray-500 font-medium">Project Showcase</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
