import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ReactTyped } from "react-typed";
import Marquee from "react-fast-marquee";
import {Link, useNavigate} from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Navigate } from "react-router-dom";

function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

   useEffect(() => {
      const cookie = document.cookie;
      if (cookie.includes("token=")) {
        // only redirect if token exists
        navigate("/feed");
      }
    }, [navigate]);

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

    <>
      <NavBar></NavBar>

      <main className="flex-grow text-white">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
          <div className="pt-24 pb-16 flex flex-col items-center justify-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl text-center font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              <ReactTyped
                strings={["Welcome to CodeConnect"]}
                typeSpeed={70}
                backSpeed={60}
                showCursor={false}
              />
            </h1>
            <p className="m-4 text-sm italic text-center">
              Built by developer, for developers.🌐
            </p>

            <div className="h-12 text-[1rem] sm:text-xl font-bold text-gray-300 text-center ">
              <p>{lines[index]}</p>
            </div>

            <div className="w-[65%] text-blue-500 py-4 mb-20">
              <Marquee gradient={false} speed={70}>
                <span className="mx-4 sm:mx-8 text-sm">#React.js</span>
                <span className="mx-4 sm:mx-8 text-sm">#Node.js</span>
                <span className="mx-4 sm:mx-8 text-sm">#MongoDB</span>
                <span className="mx-4 sm:mx-8 text-sm">#Java</span>
                <span className="mx-4 sm:mx-8 text-sm">#Javascript</span>
                <span className="mx-4 sm:mx-8 text-sm">#C++</span>
                <span className="mx-4 sm:mx-8 text-sm">#PHP</span>
              </Marquee>
            </div>

            <section className="w-full md:max-w-7xl text-gray-200 py-16 px-6 ">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-16 text-center">
                  Why Choose CodeConnect ?
                </h1>
            
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                <div className=" p-6 border bg-gray-800 border-gray-600 rounded-2xl  transition-transform duration-500 ease-out hover:scale-105 ">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl mb-2 font-bold">
                    Match with Developers
                  </h3>
                  <p className="text-sm pb-2 text-gray-400">
                    Find developers who share your tech stack and interests
                  </p>
                </div>

                <div className="  p-6 border bg-gray-800 border-gray-600  rounded-2xl transition-transform duration-500 ease-out hover:scale-105">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-xl mb-2 font-bold ">
                    Project Collaboration
                  </h3>
                  <p className="text-sm text-gray-400">
                    Start or join exciting projects that match your skills
                  </p>
                </div>

                <div className=" p-5 border bg-gray-800 border-gray-600  rounded-2xl transition-transform duration-500 ease-out hover:scale-105">
                  <div className="text-4xl mb-4 ">🌟</div>
                  <h3 className="text-xl mb-2 font-bold">Skill Growth</h3>
                  <p className="text-sm text-gray-400">
                    Learn from peers and enhance your coding abilities
                  </p>
                </div>

                <div className=" p-5 border bg-gray-800 border-gray-600  rounded-2xl transition-transform duration-500 ease-out hover:scale-105">
                  <div className="text-4xl mb-4 ">🤝</div>
                  <h3 className="text-xl mb-2 font-bold">Network Building</h3>
                  <p className="text-sm  text-gray-400">
                    Build meaningful connections in the tech community
                  </p>
                </div>
              </div>
            </section>

            <section className=" text-center w-full  py-16 px-8 bg-gray-800/30">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className=" p-6">
                  <p className="text-4xl mb-2 text-blue-600 font-bold">5000+</p>
                  <p className="text-gray-400">Active Developers</p>
                </div>

                <div className="p-6">
                  <p className="text-4xl mb-2 text-blue-600 font-bold">1000+</p>
                  <p className="text-gray-400">Successfull Matches</p>
                </div>

                <div className="p-6">
                  <p className="text-4xl mb-2 text-blue-600 font-bold">50+</p>
                  <p className="text-gray-400">Projects Launched</p>
                </div>
              </div>
            </section>

            <section className="py-14 px-6 w-full text-center">
                  <p className="text-gray-200 text-xl sm:text-2xl md:text-3xl font-bold mb-6 ">Ready to find your perfect dev match ?</p>
                  <p className="text-gray-400 mb-10">Join thousands of developers who have already found their ideal collaborators</p>
                  <Link to="/login" className="inline-block bg-blue-700 font-semibold  px-10 py-2 rounded-sm cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-blue-800">Get Started Now</Link>
            </section>

          </div>
        </div>
      </main>
      
      <Footer></Footer>
    </>

  );
}

export default Home;
