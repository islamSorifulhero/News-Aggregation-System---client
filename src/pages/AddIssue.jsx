import React, { useContext, useState } from "react";
import { AuthContext } from "../components/content/AuthProviders.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddIssue = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    photoURL: "",
    description: "",
    amount: "",
    status: "ongoing",
    email: user?.email || "",
    date: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.location ||
      !formData.photoURL ||
      !formData.description ||
      !formData.amount
    ) {
      toast.error("⚠️ Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://clean-server-side.vercel.app/api/issues",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        toast.success("Issue added successfully!");
        navigate("/dashboard/my-issues");
      } else {
        toast.error("❌ Failed to add issue!");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-green-50 dark:bg-gray-800 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
        Add New Issue
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Issue Title"
          className="w-full p-2 border rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Garbage">Garbage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
        </select>

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location (e.g. Mohakhali, Dhaka)"
          className="w-full p-2 border rounded"
        />

        <input
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue"
          className="w-full p-2 border rounded"
          rows="3"
        />

        <input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Suggested Fix Budget"
          className="w-full p-2 border rounded"
        />

        {/* Read-only fields */}
        <input
          value={formData.email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 text-gray-600"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default AddIssue;