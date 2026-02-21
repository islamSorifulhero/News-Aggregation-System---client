import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const RecentIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios
      .get("https://clean-server-side.vercel.app/api/issues?limit=8")
      .then((res) => setIssues(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
        Recent Complaints
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {issues.map((issue, index) => (
            <motion.div
              key={issue._id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="
                group bg-white dark:bg-slate-900...
              hover:bg-green-100 dark:hover:bg-slate-800
                transition-all duration-300
                rounded-xl shadow-md dark:shadow-none
                p-4 flex flex-col
              "
            >
              <img
                src={issue.image || issue.photoURL}
                alt={issue.title}
                className="h-40 w-full object-cover rounded mb-2"
              />

              <h2 className="text-xl font-extrabold text-green-700 dark:text-green-400 mt-2 mb-1 leading-tight transition group-hover:text-green-800 dark:group-hover:text-green-300">
                {issue.title}
              </h2>


              <p className="text-sm text-gray-500 dark:text-gray-400">
                {issue.category} | {issue.location}
              </p>

              <p className="mt-1 text-gray-700 dark:text-gray-300 mb-2 text-sm">
                {issue.description.length > 60
                  ? issue.description.slice(0, 60) + "..."
                  : issue.description}
              </p>

              <Link
                to={`/issue/${issue._id}`}
                className="
                  mt-auto bg-green-700 hover:bg-green-600
                  dark:bg-green-600 dark:hover:bg-green-500
                  text-white text-center py-2 rounded
                "
              >
                See Details
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentIssues;
