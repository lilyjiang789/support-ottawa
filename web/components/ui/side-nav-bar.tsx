import React, { useState } from "react";
import { Menu, X, Home } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Menu */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[345px] bg-main text-white p-6 shadow-lg transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[345px]`}
      >
        {/* Title */}
        <h1 className="text-5xl font-bold mt-40 pl-6">
          Support <span className="block">Ottawa <Home className="inline-block" size={35} /></span>
        </h1>

        {/* Navigation Links */}
        <nav className="mt-10 space-y-3 text-2xl pl-6">
          <a href="#" className="block hover:bg-secondary">About</a>
          <a href="#" className="block hover:bg-secondary">Announcements</a>
          <a href="#" className="block hover:bg-secondary">Find Shelter</a>
          <a href="#" className="block hover:bg-secondary">Find Food</a>
          <a href="#" className="block hover:bg-secondary">Donate Food</a>
          <a href="#" className="block hover:bg-secondary">Current Stats</a>
        </nav>

        {/* Sign Up/Login */}
        <div className="absolute bottom-12 left-6 pl-6">
          <a href="#" className="text-sm hover:bg-secondary">Sign Up/Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;