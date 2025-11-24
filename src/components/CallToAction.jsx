import Image from "next/image";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border-teal-500 justify-center items-center rounded-t-3xl rounded-br-3xl text-center">
      <div className="flex flex-col flex-1 justify-center">
        <h2 className="text-2xl">Want to learn more about Javascript?</h2>
        <p className="text-gray-500 my-2">
          Checkout this resourcrs with 100 Javascript Projects
        </p>
        <button className="rounded-tl-xl rounded-bl-none">
          <a href="/">100 javascript Projects</a>
        </button>
      </div>

      <div className="p-7 flex-1">
            {/* Placeholder for image - add your image URL here */}
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Image placeholder</span>
            </div>
      </div>
    </div>
  );
};

export default CallToAction;
