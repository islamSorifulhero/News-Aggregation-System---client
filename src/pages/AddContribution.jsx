import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/content/AuthProviders.jsx";
import { toast } from "react-toastify";

const AddContribution = () => {
  const { user } = useContext(AuthContext);
  const { issueId } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [formData, setFormData] = useState({
    issueId: issueId || "",
    amount: "",
    name: user?.displayName || "",
    email: user?.email || "",
    category: "",
    phone: "",
    address: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (issueId) {
      fetch(`https://clean-server-side.vercel.app/api/issues/${issueId}`)
        .then((res) => res.json())
        .then((data) => {
          setIssue(data);
          setFormData((prev) => ({ ...prev, category: data.category }));
        })
        .catch(() => toast.error("Failed to load issue"));
    }
  }, [issueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || formData.amount <= 0) {
      toast.warn("Please enter a valid amount");
      return;
    }

    const contributionData = {
      ...formData,
      issueId,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://clean-server-side.vercel.app/api/contributions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contributionData),
        }
      );

      if (res.ok) {
        toast.success("Contribution added successfully");
        navigate("/my-contributions");
      } else {
        toast.error("Failed to add contribution");
      }
    } catch (err) {
      toast.error("Server error!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-green-50 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
        Add Contribution
      </h2>

      {issue ? (
        <div className="mb-4 text-center text-gray-700">
          <p><strong>Issue:</strong> {issue.title}</p>
          <p><strong>Category:</strong> {issue.category}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-4">
          Loading issue details...
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />

        <input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />

        <input
          name="amount"
          type="text"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Submit Contribution
        </button>
      </form>
    </div>
  );
};

export default AddContribution;
