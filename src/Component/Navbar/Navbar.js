import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import your custom CSS file
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthReducer";
import { useSelector } from "react-redux";
import { FiMenu, FiUser } from "react-icons/fi"; // Import the menu icon from react-icons/fa
import Sidebar from "./Sidebar";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const enteredEmail = localStorage.getItem("email");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logOuthandler = () => {
    dispatch(authActions.islogout());
    navigate("/mailbox");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-gradient-to-r from-green-700 to-violet-900 py-4 px-8 z-10">
        <div className="flex items-center">
          <button
            className="mr-8 text-gray-100 font-bold"
            onClick={toggleSidebar}
          >
            <FiMenu size={24} />
          </button>
          {/* Add Logo for mailbox here */}
          <span className="mr-8 text-gray-100 font-bold logo">MAILBOX</span>

          {!isLoggedIn && (
            <NavLink
              to="/"
              className="mr-8 text-gray-100 font-bold"
              activeClassName="text-blue-500"
            >
              Login
            </NavLink>
          )}
          {isLoggedIn && (
            <>
              {/* <NavLink
                to="/loggedin"
                className="mr-8 text-gray-100 font-bold"
                activeClassName="text-blue-500"
              >
                Compose Mail
              </NavLink>
              <NavLink
                to="/inbox"
                className="mr-8 text-gray-100 font-bold"
                activeClassName="text-blue-500"
              >
                Inbox
              </NavLink>
              <NavLink
                to="/sentmail"
                className="text-gray-100 font-bold"
                activeClassName="text-blue-500"
              >
                Sent Mail
              </NavLink> */}
            </>
          )}
        </div>
        {isLoggedIn && (
          <div className="flex items-center">
            <span className="flex items-center mr-2 text-gray-700 hover:text-gray-100 font-bold bg-green-400 py-3 px-2 hover:bg-green-600">
              <FiUser className="mr-1" />
              <span className="font-bold">User:</span>
              <span className="ml-1">{enteredEmail}</span>
            </span>
            <button
              className="ml-6 px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-800"
              onClick={logOuthandler}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      {isLoggedIn && isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      )}
    </>
  );
}
