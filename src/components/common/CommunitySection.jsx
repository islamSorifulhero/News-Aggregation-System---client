import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'animate.css';

const CommunitySection = () => {
  const [stats, setStats] = useState({
    users: 0,
    resolved: 0,
    pending: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://clean-server-side.vercel.app/api/community-stats")
      .then((res) => {
        console.log("✅ Community Stats Response:", res.data);

        setStats({
          users:
            res.data.totalUsers ||
            res.data.users ||
            0,
          resolved:
            res.data.issuesResolved ||
            res.data.resolvedIssues ||
            res.data.resolved ||
            0,
          pending:
            res.data.issuesPending ||
            res.data.pendingIssues ||
            res.data.pending ||
            0,
        });
      })
      .catch((err) => console.error("❌ Error fetching stats:", err));
  }, []);

  return (
    <section className="bg-green-50 py-16 mt-4">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-12">
          🌍 Community Impact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl font-bold text-green-600">
              {stats.users}
            </span>
            <p className="mt-2 text-gray-600 font-semibold">Registered Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl font-bold text-green-600">
              {stats.resolved}
            </span>
            <p className="mt-2 text-gray-600 font-semibold">Issues Resolved</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl font-bold text-green-600">
              {stats.pending}
            </span>
            <p className="mt-2 text-gray-600 font-semibold">Pending Issues</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
