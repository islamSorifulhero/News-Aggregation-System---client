import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/content/AuthProviders";
import { FaFileDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MyContributions = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://clean-server-side.vercel.app/api/my-contributions/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setContributions(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading contributions:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleDownloadPDF = () => {
    if (user?.email) {
      window.open(
        `https://clean-server-side.vercel.app/api/download-pdf/${user.email}`,
        "_blank"
      );
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-green-200 border-t-green-700 rounded-full"
        />
        <p className="text-green-700 font-semibold animate-pulse">
          Loading your contributions...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        My Contributions
      </h2>

      {contributions.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No contributions found for your account.</p>
          <p className="text-sm mt-1">Make your first cleanup donation to see it here.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300"
            >
              <FaFileDownload />
              <span>Download Report (PDF)</span>
            </button>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Paid Amount</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-2 px-4 font-medium text-gray-800 dark:text-gray-200">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 text-gray-600 dark:text-gray-300">
                      {item.phone}
                    </td>
                    <td className="py-2 px-4 font-semibold text-green-700 dark:text-green-400">
                      ৳{item.amount}
                    </td>
                    <td className="py-2 px-4 text-gray-600 dark:text-gray-300">
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyContributions;
