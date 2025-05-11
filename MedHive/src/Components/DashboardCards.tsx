import { useEffect, useState } from "react";
import axios from "axios";

const DashboardCards = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pharmacists: 0,
    totalMedicaments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/stats"
        );
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Unable to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-4">Chargement du dashboard...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 p-4 rounded-xl">
      <div className="bg-[#F9F9F9] shadow-sm w-full max-w-[250px] p-4 rounded-lg hover:shadow-md transition-shadow duration-200 relative">
        <p className="text-[#1FAE94] text-base">Total Users</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xl text-[#005B4A] font-semibold">
            {stats.totalUsers}
          </p>
          <img src="/Images/UserIcon.svg" alt="User Icon" className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-[#F9F9F9] shadow-sm w-full max-w-[250px] p-4 rounded-lg hover:shadow-md transition-shadow duration-200 relative">
        <p className="text-[#1FAE94] text-base">Total Pharmacists</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xl text-[#005B4A] font-semibold">
            {stats.pharmacists}
          </p>
          <img
            src="/Images/PharmacistIcon.svg"
            alt="Pharmacist Icon"
            className="w-6 h-6"
          />
        </div>
      </div>

      <div className="bg-[#F9F9F9] shadow-sm w-full max-w-[250px] p-4 rounded-lg hover:shadow-md transition-shadow duration-200 relative">
        <p className="text-[#1FAE94] text-base">Total Medicaments</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xl text-[#005B4A] font-semibold">
            {stats.totalMedicaments}
          </p>
          <img src="/Images/PostIcon.svg" alt="Post Icon" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
