import React from "react";
import Image from "next/image";

function Hero() {
  return (
    // <div className="grid grid-cols-2 mt-10">
    //   <div>
    //     <h1 className="text-2xl font-bold">
    //       EVERYTHING IS BETTER WITH A WORD CONNECT
    //     </h1>
    //     <p className="p-5 text-md font-bold ">
    //       <span className="text-lg font-bold text-blue-950">
    //         Word Connect Innovation
    //       </span>
    //       Lorem Ipsum is simply dummy text of the printing and typesetting
    //       industry.
    //     </p>
    //     <div className="flex items-center mt-15 gap-3">
    //       <button className="bg-blue-950 px-5 py-3 rounded-full text-white font-extrabold uppercase cursor-pointer">
    //         View More
    //       </button>
    //       <button className="px-5 py-3 rounded-full text-black border-0 font-extrabold uppercase cursor-pointer">
    //         Learn More
    //       </button>
    //     </div>
    //   </div>
    //   <div className="relative">
    //     <Image
    //       src="/hero.jpg"
    //       alt="hero"
    //       className="object-contain"
    //       width={1000}
    //       height={1000}
    //     />
    //   </div>
    // </div>

    <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Summer Sales
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy discouts on selected items
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 mb-2 text-bold">
            GET 50% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/Medicine_Drugs.svg.png"
            alt="drugs"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
