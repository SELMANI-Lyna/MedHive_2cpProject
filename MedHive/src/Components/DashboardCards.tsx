import { useEffect, useState } from "react";
import axios from "axios";

// 📌 Types
type UtilisateurByRole = {
  _id: string;
  count: number;
};

type DashboardStats = {
  totalUtilisateurs: number;
  utilisateursByRole: UtilisateurByRole[];
  totalProduits: number;
  totalPharmacies: number;
};

const DashboardCards = () => {
  // 📌 Typed state
  const [stats, setStats] = useState<DashboardStats>({
    totalUtilisateurs: 0,
    utilisateursByRole: [],
    totalProduits: 0,
    totalPharmacies: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await axios.get<DashboardStats>(
          "http://localhost:5000/api/utilisateur/admin/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);
      } catch (error: any) {
        console.error("Error fetching stats:", error);
        setError(
          error.response?.data?.message || "Unable to fetch dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 📌 Get pharmacist count
  const getPharmacistCount = () => {
    const pharmacistData = stats.utilisateursByRole.find(
      (role) => role._id === "Pharmacien"
    );
    return pharmacistData ? pharmacistData.count : 0;
  };

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
            {stats.totalUtilisateurs}
          </p>
          <img src="/Images/UserIcon.svg" alt="User Icon" className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-[#F9F9F9] shadow-sm w-full max-w-[250px] p-4 rounded-lg hover:shadow-md transition-shadow duration-200 relative">
        <p className="text-[#1FAE94] text-base">Total Pharmacists</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xl text-[#005B4A] font-semibold">
            {getPharmacistCount()}
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
            {stats.totalProduits}
          </p>
          <img src="/Images/PostIcon.svg" alt="Post Icon" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
