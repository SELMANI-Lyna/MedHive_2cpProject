import { useState } from "react";
import Buttonwithoutmargin from "./Buttonwithoutmargin";

interface Pharmacist {
  id: number;
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
    backgroundColor: "#E63946", // ✅ Corrected color key!
  },
  viewFile: {
    backgroundColor: "#08D37E", 
  },
};

const initialPharmacists: Pharmacist[] = [
  { id: 1, name: "khadidja Bensallah", email: "khadidja12@gmail.com", license: "license1.pdf", status: "pending" },
  { id: 2, name: "John Doe", email: "john.doe@example.com", license: "license2.pdf", status: "pending" },
];

export default function PharmacistList() {
  const [pharmacists, setPharmacists] = useState(initialPharmacists);

  const updateStatus = (id: number, newStatus: "approved" | "declined") => {
    setPharmacists((prev) =>
      prev.map((pharmacist) => (pharmacist.id === id ? { ...pharmacist, status: newStatus } : pharmacist))
    );
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <table
        style={{
          width: "80%",
          borderCollapse: "collapse",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "-890px",
          marginBottom: "890px",
          marginLeft: "400px",
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
    <tr key={id} style={{ borderBottom: "1px solid #ddd", padding: "10px", textAlign: "left" }}>
      <td style={{ padding: "12px" }}>{name}</td>
      <td style={{ padding: "12px" }}>{email}</td>
      <td style={{ padding: "12px" }}>
        <Buttonwithoutmargin
          text="📄 View File"
          onClick={() => window.open(license, "_blank")}
          style={{ ...buttonStyles.base, ...buttonStyles.viewFile }}
        />
      </td>

      
      <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: status === "approved" ? "green" : "red" }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </td>

      
      <td style={{ padding: "12px", display: "flex", gap: "10px" }}>
        <Buttonwithoutmargin
          text="Approve"
          onClick={() => updateStatus(id, "approved")}
          style={{ ...buttonStyles.base, ...buttonStyles.approve }}
        />
        <Buttonwithoutmargin
          text="Decline"
          onClick={() => updateStatus(id, "declined")}
          style={{ ...buttonStyles.base, ...buttonStyles.decline }}
        />
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
