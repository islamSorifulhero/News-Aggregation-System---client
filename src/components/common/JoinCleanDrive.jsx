import React from "react";
import { useNavigate } from "react-router-dom";

const JoinCleanDrive = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 text-white py-10 px-6 text-center shadow-lg  bg-linear-to-r/longer from-indigo-500 to-teal-400">
      <h2 className="text-3xl font-bold mb-4">Join Our Clean Drive Initiative 🌍</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Be a part of the community making our city greener and cleaner. 
        Join as a volunteer and take part in local cleanliness campaigns.
      </p>
      <button
        onClick={() => navigate("/blog")}
        className="bg-white text-green-700 font-semibold px-6 py-2 rounded-lg hover:bg-green-100 transition"
      >
        Join Clean Drive
      </button>
    </div>
  );
};

export default JoinCleanDrive;
