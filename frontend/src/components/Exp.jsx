import React from "react";

const Exp = () => {

    
  return (
    <div>
      <div
        data-theme="business"
        class="min-h-screen flex flex-col bg-base-100 text-base-content"
      >
        <header class="fixed top-0 left-0 w-full bg-base-100 text-base-content shadow-md z-50">
          <div class="navbar w-full px-4 sm:px-6 lg:px-8 h-16 flex justify-between">
            <div class="flex items-center">
              <span class="cursor-pointer text-2xl sm:text-3xl font-extrabold tracking-tight select-none px-2 bg-gradient-to-r from-sky-400 to-pink-400 text-transparent bg-clip-text transition duration-300 hover:brightness-110 hover:underline underline-offset-4">
                DevTinder
              </span>
            </div>
            <div class="hidden md:flex items-center gap-4">
              <a
                class="btn btn-outline btn-sm border-primary text-primary px-4 flex items-center gap-2 transform transition duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                href="/login"
                data-discover="true"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-lg"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Login
              </a>
              <a
                class="btn btn-primary btn-sm text-white px-4 font-semibold transform transition duration-300 ease-in-out hover:scale-105 hover:brightness-110"
                href="/login?mode=signup"
                data-discover="true"
              >
                Sign Up
              </a>
            </div>
            <div class="md:hidden dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
              >
                <li>
                  <a href="/login" data-discover="true">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="inline mr-1"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    Login
                  </a>
                </li>
                <li>
                  <a href="/login?mode=signup" data-discover="true">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main class="flex-grow">
          <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div class="pt-24 pb-16 px-4 flex flex-col items-center justify-center gap-10">
              <div
                class="max-w-3xl text-center"
                style="opacity: 1; transform: none;"
              >
                <h1 class="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome to DevTinder ❤️
                </h1>
                <p class="text-base-content/60 italic text-sm mb-6">
                  Built by developer, for developers. 🌐
                </p>
                <div
                  class="text-lg text-white/80 font-medium mb-6"
                  style="opacity: 1; transform: none;"
                >
                  💬 Network with like-minded devs.
                </div>
                <div class="overflow-hidden whitespace-nowrap mb-10">
                  <div
                    class="inline-block"
                    style="transform: translateX(15.92%);"
                  >
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #Frontend Developer
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #Backend Engineer
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #Full-Stack Dev
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #Open Source Lover
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #ReactJS
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #Node.js
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #MongoDB
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #Machine Learning
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #Python
                    </span>
                    <span class="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      #TypeScript
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <section class="py-16 px-4" style="opacity: 1;">
              <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold text-center text-white mb-12">
                  Why Choose DevTinder?
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                    <div class="text-4xl mb-4">👥</div>
                    <h3 class="text-xl font-semibold text-white mb-2">
                      Match with Developers
                    </h3>
                    <p class="text-gray-400">
                      Find developers who share your tech stack and interests
                    </p>
                  </div>
                  <div
                    class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
                    style="transform: none;"
                  >
                    <div class="text-4xl mb-4">💼</div>
                    <h3 class="text-xl font-semibold text-white mb-2">
                      Project Collaboration
                    </h3>
                    <p class="text-gray-400">
                      Start or join exciting projects that match your skills
                    </p>
                  </div>
                  <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                    <div class="text-4xl mb-4">🌟</div>
                    <h3 class="text-xl font-semibold text-white mb-2">
                      Skill Growth
                    </h3>
                    <p class="text-gray-400">
                      Learn from peers and enhance your coding abilities
                    </p>
                  </div>
                  <div
                    class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
                    style="transform: none;"
                  >
                    <div class="text-4xl mb-4">🤝</div>
                    <h3 class="text-xl font-semibold text-white mb-2">
                      Network Building
                    </h3>
                    <p class="text-gray-400">
                      Build meaningful connections in the tech community
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section class="py-16 px-4 bg-gray-800/30">
              <div class="max-w-6xl mx-auto text-center">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div class="p-6">
                    <h3 class="text-4xl font-bold text-primary mb-2">5000+</h3>
                    <p class="text-gray-400">Active Developers</p>
                  </div>
                  <div class="p-6">
                    <h3 class="text-4xl font-bold text-primary mb-2">1000+</h3>
                    <p class="text-gray-400">Successful Matches</p>
                  </div>
                  <div class="p-6">
                    <h3 class="text-4xl font-bold text-primary mb-2">50+</h3>
                    <p class="text-gray-400">Projects Launched</p>
                  </div>
                </div>
              </div>
            </section>
            <section class="py-16 px-4">
              <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold text-white mb-6">
                  Ready to find your perfect dev match?
                </h2>
                <p class="text-gray-400 mb-8">
                  Join thousands of developers who have already found their
                  ideal collaborators
                </p>
                <a
                  href="/login"
                  class="btn btn-primary btn-wide text-lg shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  🚀 Get Started Now
                </a>
              </div>
            </section>
            <a
              href="/assistant"
              class="fixed bottom-20 right-6 z-[9999] w-14 h-14 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-2xl rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              title="AI Assistant"
            >
              🤖
            </a>
          </div>
        </main>
        <div
          id="_rht_toaster"
          style="position: fixed; z-index: 9999; inset: 16px; pointer-events: none;"
        ></div>
        <footer class="bg-neutral text-neutral-content px-6 py-12 mt-20">
          <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-primary mb-2">DevTinder</h2>
              <p class="text-sm leading-relaxed opacity-90 max-w-md">
                CodeConnect is a platform built for developers to connect,
                collaborate, and build side projects together. Whether you're
                looking for a co-founder, mentor, or teammate — this is your
                space.
              </p>
              <p class="text-xs opacity-60 pt-6">
                © 2025 DevTinder. Built with 💙 for developers.
              </p>
            </div>
            <div class="flex-1 text-sm space-y-4 md:text-right">
              <h2 class="text-xl font-semibold text-primary">
                Connect With Us
              </h2>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 md:justify-end">
                  <span>📩</span>
                  <span>
                    <span class="opacity-80">Email:</span>{" "}
                    <span class="text-blue-400">shamst0026@gmail.com</span>
                  </span>
                </li>
                <li class="flex items-center gap-2 md:justify-end">
                  <span>🔗</span>
                  <span>
                    <span class="opacity-80">LinkedIn:</span>{" "}
                    <a
                      href="https://www.linkedin.com/in/shams-tabrez-169829167/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-400 hover:underline"
                    >
                      Shams Tabrez
                    </a>
                  </span>
                </li>
                <li class="flex items-center gap-2 md:justify-end">
                  <span>📸</span>
                  <span>
                    <span class="opacity-80">Instagram:</span>{" "}
                    <span class="text-blue-400">@devtinder (coming soon)</span>
                  </span>
                </li>
              </ul>
              <div class="flex md:justify-end gap-5 pt-3">
                <a
                  href="https://github.com/Shams261"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    class="w-6 h-6 fill-current hover:text-primary transition"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.113.793-.26.793-.577 
                         0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757
                         -1.09-.744.083-.729.083-.729 1.206.085 1.84 1.236 1.84 1.236 1.07 1.835 2.806 1.305 3.492.998
                         .107-.776.42-1.305.763-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.235-3.22
                         -.123-.305-.535-1.527.117-3.182 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.403
                         1.02.005 2.047.137 3.006.403 2.29-1.552 3.295-1.23 3.295-1.23.653 1.655.24 2.877.118 3.182
                         .77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.922.43.372.816 1.104.816 2.225
                         0 1.606-.015 2.898-.015 3.293 0 .318.192.694.8.576C20.565 21.796 24 17.3 24 12
                         c0-6.63-5.373-12-12-12z"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/shams-tabrez-169829167/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    class="w-6 h-6 fill-current hover:text-primary transition"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 
                         5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75
                         s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604
                         c0-1.336-.026-3.06-1.865-3.06-1.865 0-2.152 1.458-2.152 2.965v5.699h-3v-10h2.879v1.365
                         h.042c.401-.759 1.379-1.56 2.839-1.56 3.038 0 3.597 2 3.597 4.604v5.591z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Exp;
