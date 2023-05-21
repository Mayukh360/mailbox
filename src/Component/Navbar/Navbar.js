import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import your custom CSS file
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthReducer";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const enteredEmail = localStorage.getItem("email");

  const logOuthandler = () => {
    dispatch(authActions.islogout());
    navigate("/");
  };
  return (
    <nav className="flex items-center justify-between bg-gray-200 py-4 px-8">
  <div className="flex items-center">
    <NavLink to="/" className="mr-8 text-gray-700 font-bold" activeClassName="text-blue-500">Login</NavLink>
    {isLoggedIn && (
      <>
        <NavLink to="/loggedin" className="mr-8 text-gray-700 font-bold" activeClassName="text-blue-500">Compose Mail</NavLink>
        <NavLink to="/inbox" className="mr-8 text-gray-700 font-bold" activeClassName="text-blue-500">Inbox</NavLink>
        <NavLink to="/sentmail" className="text-gray-700 font-bold" activeClassName="text-blue-500">Sent Mail</NavLink>
        
      </>
    )}
  </div>
  {isLoggedIn && (
    <div className="flex items-center">
    <button className="mr-6 px-4 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-800" onClick={logOuthandler}>Logout</button>
      <span className="mr-2 text-gray-700 font-bold bg-green-400 py-3 px-2 hover:bg-green-500">User: {enteredEmail}</span>
      
    </div>
  )}
</nav>
  );
}
