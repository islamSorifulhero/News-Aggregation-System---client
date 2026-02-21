import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const DashboardHome = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch("https://clean-server-side.vercel.app/api/issues")
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    return (
        <div>
            {/* Overview Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow">
                    <h4>Total Issues</h4>
                    <p className="text-2xl font-bold">{stats.length}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h4>Ongoing</h4>
                    <p className="text-2xl font-bold">
                        {stats.filter(i => i.status !== "ended").length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h4>Resolved</h4>
                    <p className="text-2xl font-bold">
                        {stats.filter(i => i.status === "ended").length}
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded shadow mb-8">
                <Bar
                    data={{
                        labels: ["Total", "Ongoing", "Resolved"],
                        datasets: [
                            {
                                data: [
                                    stats.length,
                                    stats.filter(i => i.status !== "ended").length,
                                    stats.filter(i => i.status === "ended").length,
                                ],
                            },
                        ],
                    }}
                />
            </div>

            {/* Data Table */}
            <div className="bg-white p-6 rounded shadow">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.slice(0, 5).map(issue => (
                            <tr key={issue._id}>
                                <td>{issue.title}</td>
                                <td>{issue.category}</td>
                                <td>{issue.status || "ongoing"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardHome;
