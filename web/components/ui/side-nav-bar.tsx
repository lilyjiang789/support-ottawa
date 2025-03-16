import React, { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { useAction } from "@gadgetinc/react";
import { Link, useNavigate } from "react-router";
import { api } from "../../api";

interface SideNavBarProps {
  isAuthenticated?: boolean;
}

const SideNavBar = ({ isAuthenticated = false }: SideNavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [{ fetching }, signOut] = useAction(api.user.signOut);
  
  const handleSignOut = async () => {
    try {
      await signOut({}); // Pass empty object to match action expectations
      navigate("/"); // Use React Router's navigate for redirection
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
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
          <Link to="/about" className="block hover:bg-secondary">About</Link>
          <Link to="/announcements" className="block hover:bg-secondary">Announcements</Link>
          <Link to="/find-shelter" className="block hover:bg-secondary">Find Shelter</Link>
          <Link to="/find-food" className="block hover:bg-secondary">Find Food</Link>
          <Link to="/donate" className="block hover:bg-secondary">Donate</Link>
          <Link to="/stats" className="block hover:bg-secondary">Current Stats</Link>
        </nav>

        {/* Authentication Links */}
        <div className="absolute bottom-12 left-6 pl-6">
          {isAuthenticated ? (
            <div className="space-y-2">
              <Link to="/profile" className="text-sm hover:bg-secondary block">Profile</Link>
              <button 
                onClick={handleSignOut} 
                disabled={fetching}
                className="text-sm hover:bg-secondary text-left w-full"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/sign-in" className="text-sm hover:bg-secondary">Sign Up/Log in</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;