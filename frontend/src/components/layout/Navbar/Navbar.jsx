import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import RoleBadge from "../../common/RoleBadge/RoleBadge";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="no-underline">
          <h1 className="text-xl md:text-xl text-indigo-600 m-0 font-bold">
            Ceylon Leaf
          </h1>
        </Link>

        <div className="flex items-center gap-6">
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
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium no-underline transition-all hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
