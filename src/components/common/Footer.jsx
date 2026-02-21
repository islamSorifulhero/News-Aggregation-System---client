import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white mt-4">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">

        <div className="text-center md:text-left">
          <Link to="/">
            <h2 className="text-3xl font-extrabold mb-3 text-white tracking-wide hover:text-green-300 transition">
              CleanCity
            </h2>
          </Link>
          <p className="text-gray-200 text-sm leading-relaxed">
            CleanCity is a community-driven platform for reporting and solving
            environmental and cleanliness issues in your area. Together, we make
            cities cleaner and greener! 🌱
          </p>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3 text-green-200">
            Useful Links
          </h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <Link to="/" className="hover:text-green-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-issues" className="hover:text-green-300 transition">
                All Issues
              </Link>
            </li>
            <li>
              <Link to="/add-issue" className="hover:text-green-300 transition">
                Add Issue
              </Link>
            </li>
            <li>
              <Link
                to="/my-contributions"
                className="hover:text-green-300 transition"
              >
                My Contributions
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3 text-green-200">
            Contact Us
          </h3>
          <p className="text-gray-200 text-sm leading-relaxed">
            📍 Dhaka, Bangladesh <br />
            📧 support@cleancity.com <br />
            ☎️ +880 1234-567890
          </p>
        </div>
      </div>

      <div className="border-t border-green-600 py-4 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-green-200">CleanCity</span> — All
        Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
