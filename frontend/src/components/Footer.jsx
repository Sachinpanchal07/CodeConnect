import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full ">
      <div className="flex flex-col md:flex-row justify-around md:justify-between gap-5 px-8 py-8 text-center">
        <div className="w-full  md:text-left md:w-1/2 m-5">
          <h2 className="text-blue-600 text-2xl font-semibold pb-3">
            CodeConnect
          </h2>
          <p className=" pb-4 text-gray-200 text-sm">
            DevTinder is a platform built for developers to connect,
            collaborate, and build side projects together. Whether you're
            looking for a co-founder, mentor, or teammate — this is your space.
          </p>
          <p className="text-gray-400 text-sm">
            © 2025 DevTinder. Built with 💙 for developers.
          </p>
        </div>

        <div className="w-full md:w-1/2 m-5  md:text-right">
          <h2 className="text-blue-600 text-2xl font-semibold pb-3">
            Connect With Us
          </h2>
          <ul className="text-gray-200 text-sm">
            <li className="pb-1">
              📩 Email:{" "}
              <span className="text-blue-500">
                codeconnect.application@gmail.com
              </span>
            </li>
            <li>
              <span>
                🔗 LinkedIn:
                <a
                  className="text-blue-500 "
                  href="https://www.linkedin.com/in/sachin-panchal-28353924a/"
                >
                  {" "}
                  sachin panchal
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
