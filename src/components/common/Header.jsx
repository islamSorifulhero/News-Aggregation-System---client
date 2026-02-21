import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center p-6 bg-green-100 dark:bg-gray-800">
      <h1 className="text-xl font-bold text-green-700 dark:text-green-300">Clean Community</h1>
      <button
        onClick={toggleTheme}
        className="bg-green-600 dark:bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
