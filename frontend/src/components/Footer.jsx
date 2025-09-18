import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-200 dark:bg-neutral-600 text-neutral-content p-4 fixed bottom-0 w-full flex flex-col sm:flex-row items-center justify-between">
      <aside className="text-center sm:text-left">
        <p className="text-neutral-800 dark:text-neutral-200 text-sm">Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <button className="p-1 px-2 bg-amber-400 text-white cursor-pointer rounded-sm">
        <i className="bx bx-bug cursor-pointer mr-1 "></i>
        Report Issue
      </button>
    </footer>
  );
};

export default Footer;
