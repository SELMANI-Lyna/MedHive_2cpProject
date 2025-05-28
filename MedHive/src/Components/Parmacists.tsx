import { useEffect, useState } from "react";
import Buttonwithoutmargin from "./Buttonwithoutmargin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/utilisateur/admin/pharmaciens/demandes";
const PHARMACIST_BASE_URL = "http://localhost:5000/api/utilisateur/admin/pharmaciens";

interface Pharmacist {
  id: string;
  name: string;
  email: string;
  license: string;
  status: "pending" | "approved" | "declined";
}

const buttonStyles = {
  base: {
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
  },
  approve: {
    backgroundColor: "#18BF5E",
  },
  decline: {
    backgroundColor: "#E63946",
  },
  viewFile: {
    backgroundColor: "#08D37E",
  },
};

export default function PharmacistList() {
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const fetchPharmacists = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch pharmacists");
      
      const data = await response.json();
      
      const mappedData = data.map((pharmacy: any) => ({
        id: pharmacy._id,
        name: pharmacy.nom,
        email: pharmacy.proprietaire?.email || "N/A",
        license: pharmacy.licenseFile || "/default-license.pdf",
        status: pharmacy.compteValide ? "approved" : "pending",
      }));

      setPharmacists(mappedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pharmacists:", error);
      toast.error("Failed to load pharmacist data");
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchPharmacists();
  }, [refreshTrigger]);

  const updateStatus = async (id: string, newStatus: "approved" | "declined") => {
    try {
      const endpoint = `${PHARMACIST_BASE_URL}/${id}/${newStatus === "approved" ? "valider" : "decliner"}`;
      
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newStatus} pharmacist`);
      }

      setPharmacists(prev =>
        prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
      );
      
      toast.success(`Pharmacist ${newStatus} successfully!`);
      setRefreshTrigger(prev => !prev); // Trigger data refresh
    } catch (error) {
      console.error(`Error ${newStatus} pharmacist:`, error);
      toast.error(`Failed to ${newStatus} pharmacist: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        padding: "40px" 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <table
        style={{
          width: "70%",
          borderCollapse: "collapse",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "20px",
          marginRight: "-500px",
        }}
      >
        <thead>
          <tr style={{ background: "#BBBBBB", color: "white", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>License</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacists.map(({ id, name, email, license, status }) => (
            <tr 
              key={id} 
              style={{ 
                borderBottom: "1px solid #ddd", 
                padding: "10px", 
                textAlign: "left",
                backgroundColor: status === "pending" ? "#fff9e6" : "inherit"
              }}
            >
              <td style={{ padding: "12px" }}>{name}</td>
              <td style={{ padding: "12px" }}>{email}</td>
              <td style={{ padding: "12px" }}>
                <Buttonwithoutmargin
                  text="📄 View File"
                  onClick={() => window.open(license, "_blank")}
                  style={{ ...buttonStyles.base, ...buttonStyles.viewFile }}
                  disabled={!license}
                />
              </td>
              <td style={{ 
                padding: "12px", 
                textAlign: "center", 
                fontWeight: "bold", 
                color: status === "approved" 
                  ? "green" 
                  : status === "declined" 
                  ? "red" 
                  : "orange"
              }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </td>
              <td style={{ padding: "12px", display: "flex", gap: "10px" }}>
                <Buttonwithoutmargin
                  text="Approve"
                  onClick={() => updateStatus(id, "approved")}
                  style={{ 
                    ...buttonStyles.base, 
                    ...buttonStyles.approve,
                    opacity: status === "approved" ? 0.6 : 1
                  }}
                  disabled={status === "approved"}
                />
                <Buttonwithoutmargin
                  text="Decline"
                  onClick={() => updateStatus(id, "declined")}
                  style={{ 
                    ...buttonStyles.base, 
                    ...buttonStyles.decline,
                    opacity: status === "declined" ? 0.6 : 1
                  }}
                  disabled={status === "declined"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
