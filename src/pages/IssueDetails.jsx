import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const IssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    issueId: id,
    amount: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: ""
  });

  useEffect(() => {
    axios.get(`https://clean-server-side.vercel.app/api/issues/${id}`)
      .then(res => setIssue(res.data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    axios.get(`https://clean-server-side.vercel.app/api/contributions/${id}`)
      .then(res => setContributions(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://clean-server-side.vercel.app/api/contributions", formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Contribution Added!",
          text: "Thank you for supporting the clean-up initiative",
          confirmButtonColor: "#15803d",
        });

        setShowModal(false);
        setContributions((prev) => [...prev, formData]);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to add contribution. Please try again.",
          confirmButtonColor: "#dc2626",
        });
      });
  }
  if (!issue) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">{issue.title}</h1>
      <img src={issue.image || issue.photoURL} alt={issue.title} className="w-full h-60 object-cover rounded mb-4" />
      <p><strong>Category:</strong> {issue.category}</p>
      <p><strong>Location:</strong> {issue.location}</p>
      <p><strong>Description:</strong> {issue.description}</p>
      <p><strong>Date:</strong> {new Date(issue.date).toLocaleDateString()}</p>
      <p><strong>Suggested Fix Budget:</strong> ৳{issue.amount}</p>

      <button
        className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => setShowModal(true)}
      >
        Pay Clean-Up Contribution
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Add Contribution</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required className="w-full p-2 border rounded" />

              <input
                name="photoUrl"
                type="text"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Photo-URL"
                className="w-full p-2 border rounded"
              />
              <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="text" name="address" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required className="w-full p-2 border rounded" />
              <textarea name="additionalInfo" placeholder="Additional Info" onChange={handleChange} className="w-full p-2 border rounded"></textarea>
              <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600">Submit</button>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-2">Contributors</h2>
      {contributions.length === 0 ? (
        <p>No contributions yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{c.name}</td>
                <td className="border px-2 py-1">{c.email}</td>
                <td className="border px-2 py-1">৳{c.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IssueDetails;
