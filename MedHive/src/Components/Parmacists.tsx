import { useEffect, useState } from "react";
import Buttonwithoutmargin from "./Buttonwithoutmargin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL =
  "http://localhost:5000/api/utilisateur/admin/pharmaciens/demandes";
const PHARMACIST_BASE_URL =
  "http://localhost:5000/api/utilisateur/admin/pharmaciens";

interface Pharmacist {
  id: string;
  username: string;
  email: string;
  compteValide: boolean;
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

      const mappedData = data.map((pharmacist: any) => ({
        id: pharmacist._id,
        username: pharmacist.username,
        email: pharmacist.email,
        compteValide: pharmacist.compteValide,
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

  const updateStatus = async (
    id: string,
    newStatus: "approved" | "declined"
  ) => {
    try {
      if (newStatus === "approved") {
        const response = await fetch(`${PHARMACIST_BASE_URL}/${id}/valider`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to approve pharmacist");
      } else {
        const response = await fetch(`${PHARMACIST_BASE_URL}/${id}/refuser`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to decline pharmacist");
      }

      toast.success(`Pharmacist ${newStatus} successfully!`);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error(`Error ${newStatus} pharmacist:`, error);
      toast.error(
        `Failed to ${newStatus} pharmacist: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px",
        }}
      >
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
          <tr
            style={{ background: "#BBBBBB", color: "white", textAlign: "left" }}
          >
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacists.map(({ id, username, email, compteValide }) => (
            <tr
              key={id}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
                backgroundColor: !compteValide ? "#fff9e6" : "inherit",
              }}
            >
              <td style={{ padding: "12px" }}>{username}</td>
              <td style={{ padding: "12px" }}>{email}</td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: compteValide ? "green" : "orange",
                }}
              >
                {compteValide ? "Approved" : "Pending"}
              </td>
              <td style={{ padding: "12px", display: "flex", gap: "10px" }}>
                <Buttonwithoutmargin
                  text="Approve"
                  onClick={() => updateStatus(id, "approved")}
                  style={{
                    ...buttonStyles.base,
                    ...buttonStyles.approve,
                    opacity: compteValide ? 0.6 : 1,
                  }}
                  disabled={compteValide}
                />
                <Buttonwithoutmargin
                  text="Decline"
                  onClick={() => updateStatus(id, "declined")}
                  style={{
                    ...buttonStyles.base,
                    ...buttonStyles.decline,
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
