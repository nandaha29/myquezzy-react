import React from "react";

function Navbar() {
  return (
    <>
      <nav class="bg-white border-3 border-b-red-200 drop-shadow-sm sticky top-0">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
                <h1 className="text-violet-500 text-xl font-semibold">
                  MyQuezzy
                  <span className="text-black font-bold">App.</span>
                </h1>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  <a href="/" className=" text-gray-500 hover:text-violet-500 rounded-md px-2 py-2 text-sm font-medium" aria-current="page">
                    Dashboard
                  </a>
                  <a href="/login" className=" text-gray-500 hover:text-violet-500 rounded-md px-2 py-2 text-sm font-medium" aria-current="page">
                    Login
                  </a>
                  <a href="/register" className=" text-gray-500 hover:text-violet-500 rounded-md px-2 py-2 text-sm font-medium" aria-current="page">
                    Regist
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <a href="/" className=" text-gray-500 hover:violet-500 rounded-md px-2 py-2 text-sm font-medium" aria-current="page">
              Home
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
