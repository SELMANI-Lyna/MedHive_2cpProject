import { useState, useRef, useEffect } from "react";

interface AdminProfileProps {
  adminName: string;
  adminEmail: string;
  profileImage?: string;
}

function Adminprofile({ adminName, adminEmail, profileImage }: AdminProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "center",
        textAlign: "left",
        justifyContent: "flex-end",
        paddingRight: "65px",
        paddingTop: "100px",
        marginTop: "-1065px",
        position: "relative", // Make the dropdown position absolute to this container
      }}
    >
      {/* Clickable Container */}
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "10px" }}
        onClick={handleToggle}
      >
        {/* Avatar Circle */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#D9D9D9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 600,
            color: "black",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Admin"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            adminName.charAt(0)
          )}
        </div>

        {/* Admin Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "16px",
            color: "black",
            lineHeight: "1.2",
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>{adminName}</p>
          <p style={{ margin: 0, color: "#6A6A6A", fontSize: "14px" }}>{adminEmail}</p>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div
          style={{
            position: "absolute",
            top: "150px",
            right: "0",
            backgroundColor: "#FFFFFF",
            border: "1px solid #DDD",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            textAlign: "left",
            width: "200px",
          }}
        >
          <p style={{ margin: "0 0 10px 0", fontWeight: 600 }}>Name: {adminName}</p>
          <p style={{ margin: "0 0 15px 0", color: "#6A6A6A", fontSize: "14px" }}>Email: {adminEmail}</p>
          <button
            onClick={() => console.log("Logging out...")}
            style={{
              width: "100%",
              backgroundColor: "#E63946",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
          <button
            onClick={() => console.log("Switching account...")}
            style={{
              width: "100%",
              backgroundColor: "#3498DB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Switch Account
          </button>
        </div>
      )}
    </div>
  );
}

export default Adminprofile;
