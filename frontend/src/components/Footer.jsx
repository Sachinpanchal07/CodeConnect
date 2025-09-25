import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full px-8 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-center">
        <div className="flex-1 md:text-left my-5">
          <h2 className="text-blue-600 text-2xl font-semibold mb-3">
            CodeConnect
          </h2>
          <p className=" pb-4 text-gray-200 text-sm">
            CodeConnect is a platform built for developers to connect,
            collaborate, and build side projects together. Whether you're
            looking for a co-founder, mentor, or teammate — this is your space.
          </p>
          <p className="text-gray-400 text-sm">
            © 2025 CodeConnect. Built with 💙 for developers.
          </p>
        </div>

        <div className="w-full md:w-1/2 my-5  md:text-right">
          <h2 className="text-blue-600 text-2xl font-semibold mb-3">
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
                  target="_blank"
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
