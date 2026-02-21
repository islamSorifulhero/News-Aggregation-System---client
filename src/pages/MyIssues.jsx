import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/content/AuthProviders";
import { motion } from "framer-motion";

const MyIssues = () => {
  const { user } = useContext(AuthContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`https://clean-server-side.vercel.app/api/issues?email=${user.email}`)
        .then((res) => {
          setIssues(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://clean-server-side.vercel.app/api/issues/${selectedIssue._id}`,
        selectedIssue
      );
      setIssues((prev) =>
        prev.map((item) =>
          item._id === selectedIssue._id ? selectedIssue : item
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://clean-server-side.vercel.app/api/issues/${selectedIssue._id}`
      );
      setIssues((prev) =>
        prev.filter((item) => item._id !== selectedIssue._id)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-200 border-t-green-700 rounded-full"
        />
        <p className="text-green-700 font-semibold animate-pulse">
          Loading your issues...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        My Reported Issues
      </h1>

      {issues.length === 0 ? (
        <p className="text-gray-500">No issues reported yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    <img
                      src={issue.image || issue.photoURL}
                      alt={issue.title}
                      className="h-16 w-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 font-semibold">{issue.title}</td>
                  <td className="p-2">{issue.category}</td>
                  <td className="p-2 text-green-700 font-semibold">
                    ৳{issue.amount}
                  </td>
                  <td className="p-2">
                    {issue.status || "Ongoing"}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setIsEditModalOpen(true);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setIsDeleteModalOpen(true);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && selectedIssue && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Update Issue
            </h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                value={selectedIssue.title}
                onChange={(e) =>
                  setSelectedIssue({
                    ...selectedIssue,
                    title: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              <input
                value={selectedIssue.category}
                onChange={(e) =>
                  setSelectedIssue({
                    ...selectedIssue,
                    category: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                value={selectedIssue.amount}
                onChange={(e) =>
                  setSelectedIssue({
                    ...selectedIssue,
                    amount: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              <textarea
                value={selectedIssue.description}
                onChange={(e) =>
                  setSelectedIssue({
                    ...selectedIssue,
                    description: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              <select
                value={selectedIssue.status || "Ongoing"}
                onChange={(e) =>
                  setSelectedIssue({
                    ...selectedIssue,
                    status: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Ended">Ended</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && selectedIssue && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Are you sure?
            </h2>
            <p className="mb-4">{selectedIssue.title}</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
