import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ReactTyped } from "react-typed";
import Marquee from "react-fast-marquee";
import {Link} from "react-router-dom";

function Home() {
  const [index, setIndex] = useState(0);

  // flipping text.
  const lines = [
    "🤝 Collaborate on exciting projects.",
    "🚀 Launch your next startup idea.",
    "👨‍💻 Find your perfect dev match!",
    "💬 Network with like-minded devs.",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (

    <main className="flex-grow text-white">

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
        <div className="pt-24 pb-16 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:5xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {/* {""} */}
            <ReactTyped
              strings={["Welcome to CodeConnect"]}
              typeSpeed={70}
              backSpeed={60}
              showCursor={false}
            />
          </h1>
          <p className="m-4 text-sm italic">
            Built by developer, for developers.🌐
          </p>

          <div className="h-12 text-xl font-bold text-gray-300 flex items-center justify-center ">
            <p>{lines[index]}</p>
          </div>

          <div className="w-200 text-blue-500 py-4 mb-20">
            <Marquee gradient={false} speed={80}>
              <span className="mx-8 text-sm">#React.js</span>
              <span className="mx-8 text-sm">#Node.js</span>
              <span className="mx-8 text-sm">#MongoDB</span>
              <span className="mx-8 text-sm">#Java</span>
              <span className="mx-8 text-sm">#Javascript</span>
              <span className="mx-8 text-sm">#C++</span>
              <span className="mx-8 text-sm">#PHP</span>
            </Marquee>
          </div>

          <section className="text-gray-300 py-16 px-4 ">
            <div className="">
              <h1 className="text-3xl font-bold mb-16 text-center">
                Why Choose CodeConnect ?
              </h1>
            </div>
            <div className="flex flex-wrap gap-7">
              <div className="w-70 p-6 border bg-gray-800 border-gray-600 rounded-2xl  transition-transform duration-500 ease-out hover:scale-105 ">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl mb-2 font-bold">
                  Match with Developers
                </h3>
                <p className="text-sm px-5 pb-2 text-gray-500">
                  Find developers who share your tech stack and interests
                </p>
              </div>

              <div className="w-70 p-6 border bg-gray-800 border-gray-600  rounded-2xl transition-transform duration-500 ease-out hover:scale-105">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold mb-2">
                  Project Collaboration
                </h3>
                <p className="text-sm text-gray-500">
                  Start or join exciting projects that match your skills
                </p>
              </div>

              <div className="w-70 p-5 border bg-gray-800 border-gray-600  rounded-2xl transition-transform duration-500 ease-out hover:scale-105">
                <div className="text-4xl mb-4 ">🌟</div>
                <h3 className="text-xl mb-2 font-bold">Skill Growth</h3>
                <p className="text-sm text-gray-500">
                  Learn from peers and enhance your coding abilities
                </p>
              </div>

              <div className="w-70 p-5 border bg-gray-800 border-gray-600  rounded-2xl transition-transform duration-500 ease-out hover:scale-105">
                <div className="text-4xl mb-4 ">🤝</div>
                <h3 className="text-xl mb-2 font-bold">Network Building</h3>
                <p className="text-sm  text-gray-500">
                  Build meaningful connections in the tech community
                </p>
              </div>
            </div>
          </section>

          <section className=" text-center w-full my-8 py-16 flex flex-wrap justify-around gap-10 bg-gray-800/30">
            <div className=" p-6">
              <p className="text-4xl mb-2 text-blue-600 font-semibold">5000+</p>
              <p className="text-gray-400">Active Developers</p>
            </div>

            <div className="p-6">
              <p className="text-4xl mb-2 text-blue-600 font-semibold">1000+</p>
              <p className="text-gray-400">Successfull Matches</p>
            </div>

            <div className="p-6">
              <p className="text-4xl mb-2 text-blue-600 font-semibold">50+</p>
              <p className="text-gray-400">Projects Launched</p>
            </div>
          </section>

          <section className="py-14 w-full text-center">
                <p className="text-gray-300 text-3xl font-bold mb-6 ">Ready to find your perfect dev match?</p>
                <p className="text-gray-400 mb-10">Join thousands of developers who have already found their ideal collaborators</p>
                <Link to="/login" className="inline-block bg-blue-700 font-semibold  px-10 py-2 rounded-sm cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-blue-800">Get Started Now</Link>
          </section>

        </div>
      </div>
    </main>
  );
}

export default Home;
