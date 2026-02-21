import React, { useContext, useState } from "react";
import { AuthContext } from "../components/content/AuthProviders";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        phone: user.phone || "",
        address: user.address || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put(`https://clean-server-side.vercel.app/api/users/${user._id}`, formData);
            if (res.status === 200) {
                toast.success("Profile updated successfully!");
                if (setUser) setUser(res.data);
            } else {
                toast.error("Failed to update profile.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 flex justify-center">
            <div className="w-full max-w-lg">
                <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">My Profile</h2>

                <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow space-y-4">
                    {/* Profile image + input */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img
                            src={formData.photoURL || "/default-avatar.png"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <input
                            type="text"
                            name="photoURL"
                            value={formData.photoURL}
                            onChange={handleChange}
                            placeholder="Profile Image URL"
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Name</label>
                        <input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full p-2 border rounded mt-1 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter your address"
                            rows={2}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
