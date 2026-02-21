import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Root = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
      <div className="p-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
