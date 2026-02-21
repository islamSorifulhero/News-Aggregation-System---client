import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../components/content/AuthProviders";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const navItemClass = ({ isActive }) =>
        `block px-3 py-2 rounded transition ${isActive
            ? "bg-green-600 text-white"
            : "hover:bg-green-600 hover:text-white"
        }`;

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-slate-950">
            {/* Sidebar */}
            <aside
                className={`
          fixed md:static z-40
          w-64 h-full
          bg-green-700 text-white
          p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
            >
                <NavLink to="/">
                    <h2 className="text-xl font-extrabold mb-6 hover:bg-green-600 p-2 rounded">
                        ← Back to Home
                    </h2>
                </NavLink>

                <nav className="space-y-2">
                    <NavLink to="/dashboard" end className={navItemClass}>
                        Dashboard Home
                    </NavLink>
                    <NavLink to="/dashboard/all-issues" className={navItemClass}>
                        All Issues
                    </NavLink>
                    <NavLink to="/dashboard/add-issue" className={navItemClass}>
                        Add Issue
                    </NavLink>
                    <NavLink to="/dashboard/my-issues" className={navItemClass}>
                        My Issues
                    </NavLink>
                    <NavLink to="/dashboard/add-contribution" className={navItemClass}>
                        Add Contribution
                    </NavLink>
                    <NavLink to="/dashboard/my-contributions" className={navItemClass}>
                        My Contributions
                    </NavLink>
                    <NavLink to="/dashboard/profile" className={navItemClass}>
                        Profile
                    </NavLink>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <div className="flex justify-between items-center bg-white dark:bg-slate-900 shadow px-6 py-3">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-xl"
                            onClick={() => setOpen(!open)}
                        >
                            <FaBars />
                        </button>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                            Welcome, {user?.displayName || "User"}
                        </h3>
                    </div>

                    <div className="relative group">
                        <img
                            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="profile"
                            className="w-10 h-10 rounded-full cursor-pointer border"
                        />

                        <div className="absolute right-0 hidden group-hover:block bg-white dark:bg-slate-800 shadow rounded mt-2 w-40">
                            <NavLink
                                to="/dashboard/profile"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                Profile
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6 flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
