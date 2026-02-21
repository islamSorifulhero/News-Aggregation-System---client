import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 8;

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://clean-server-side.vercel.app/api/issues")
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        Swal.fire("Error!", "Failed to fetch issues.", "error");
      });
  }, []);

  // Filter + Search + Sort
  const filteredIssues = issues
    .filter((issue) =>
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.toLowerCase().includes(search.toLowerCase())
    )
    .filter((issue) => (categoryFilter ? issue.category === categoryFilter : true))
    .filter((issue) => (statusFilter ? issue.status === statusFilter : true))
    .sort((a, b) => {
      if (sortBy === "amount") return a.amount - b.amount;
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  // Pagination
  const indexOfLast = currentPage * issuesPerPage;
  const indexOfFirst = indexOfLast - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-200 border-t-green-700 rounded-full"
        />
        <p className="text-green-700 dark:text-green-400 font-semibold animate-pulse">
          Loading issues...
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-green-700 dark:text-green-400">
        All Issues
      </h1>

      {/* Search + Filter + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/6"
        >
          <option value="">All Categories</option>
          <option value="Garbage">Garbage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/6"
        >
          <option value="">All Status</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Ended">Ended</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded w-full md:w-1/6"
        >
          <option value="">Sort By</option>
          <option value="amount">Amount (Low to High)</option>
          <option value="date">Date (Newest)</option>
        </select>
      </div>

      {/* Issues Grid */}
      {currentIssues.length === 0 ? (
        <p className="text-gray-500 text-center">No issues found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {currentIssues.map((issue, index) => (
              <motion.div
                key={issue._id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="
                  group
                  bg-white dark:bg-slate-900
                  hover:bg-green-50 dark:hover:bg-slate-800
                  transition-all duration-300
                  rounded-xl
                  shadow
                  dark:shadow-slate-900/50
                  p-4
                  flex flex-col
                  border border-transparent dark:border-slate-800
                "
              >
                <img
                  src={issue.image || issue.photoURL}
                  alt={issue.title}
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />

                <h2 className="text-xl font-extrabold text-green-700 dark:text-green-400 leading-tight transition group-hover:text-green-800 dark:group-hover:text-green-300">
                  {issue.title}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {issue.category} • {issue.location}
                </p>

                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {issue.description.length > 70
                    ? issue.description.slice(0, 70) + "..."
                    : issue.description}
                </p>

                <p className="text-green-700 font-semibold mb-2">৳{issue.amount}</p>

                <Link
                  to={`/issue/${issue._id}`}
                  className="mt-auto bg-green-700 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white text-center py-2 rounded-lg font-semibold transition"
                >
                  See Details
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-green-600 text-white" : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllIssues;
