import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-200 dark:bg-neutral-600 text-neutral-content p-4 fixed bottom-0 w-full flex flex-col sm:flex-row items-center justify-between">
      <aside className="text-center sm:text-left">
        <p className="text-neutral-800 dark:text-neutral-200">Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="mt-2 sm:mt-0">
        {/* Icons removed as requested */}
      </nav>
    </footer>
  );
};

export default Footer;
