import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FiEdit, FiInbox, FiSend } from "react-icons/fi";

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ x: "-100%", top: "80px" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-red-900 to-purple-800 text-gray-200"
      ref={sidebarRef}
    >
      <nav className="mt-8">
        <ul>
          <li>
            <NavLink
              to="/loggedin"
              className="block flex items-center py-2 px-4 hover:bg-gray-700"
              activeClassName="bg-gray-700"
              onClick={onClose}
            >
              <FiEdit className="mr-2" />
              Compose Mail
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inbox"
              className="block flex items-center py-2 px-4 hover:bg-gray-700"
              activeClassName="bg-gray-700"
              onClick={onClose}
            >
              <FiInbox className="mr-2" />
              Inbox
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sentmail"
              className="block flex items-center py-2 px-4 hover:bg-gray-700"
              activeClassName="bg-gray-700"
              onClick={onClose}
            >
              <FiSend className="mr-2" />
              Sent Mail
            </NavLink>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
