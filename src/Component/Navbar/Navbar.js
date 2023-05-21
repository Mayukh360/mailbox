import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS file

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-200 py-4 px-8">
    <div>
      <NavLink to="/" className="mr-8 text-gray-700 font-bold" activeclassname="text-blue-500">Login</NavLink>
      <NavLink to="/loggedin" className="mr-8 text-gray-700 font-bold" activeclassname="text-blue-500">Compose Mail</NavLink>
      <NavLink to="/inbox" className="mr-8 text-gray-700 font-bold" activeclassname="text-blue-500">Inbox</NavLink>
      <NavLink to="/sentmail" className="text-gray-700 font-bold" activeclassname="text-blue-500">Sent Mail</NavLink>
    </div>
  </nav>
  );
}
