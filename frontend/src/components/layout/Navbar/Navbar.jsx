import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import RoleBadge from "../../common/RoleBadge/RoleBadge";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="no-underline">
          <h1 className="text-xl md:text-xl text-indigo-600 m-0 font-bold">
            Ceylon Leaf
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <RoleBadge />
              <span className="text-gray-900 font-medium hidden md:inline">
                Welcome, {user.name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white border-none rounded-md font-medium cursor-pointer transition-all hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/register"
                className="px-4 py-2 bg-emerald-500 text-white rounded-md font-medium no-underline transition-all hover:bg-emerald-600"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium no-underline transition-all hover:bg-indigo-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 shadow-sm">
          {user ? (
            <div className="flex flex-col gap-3">
              <RoleBadge />
              <span className="text-gray-900 font-medium">Welcome, {user.name}</span>
              <button
                onClick={handleMobileLogout}
                className="w-full px-4 py-2 bg-red-500 text-white border-none rounded-md font-medium cursor-pointer transition-all hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2 bg-emerald-500 text-white rounded-md font-medium no-underline transition-all hover:bg-emerald-600"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2 bg-indigo-600 text-white rounded-md font-medium no-underline transition-all hover:bg-indigo-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
