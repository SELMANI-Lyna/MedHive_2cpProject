import { useState, useEffect, useRef } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaUserMd, FaFlag } from "react-icons/fa";
import axios from "axios";

interface BackendNotification {
  _id: string;
  type: string;
  dateCreation: string;
  message?: { contenu: string };
  produit?: { nom: string };
  pharmacien?: { nomPharmacie: string; email: string };
  signalePar?: { email: string };
}

const timeAgo = (timestamp: string) => {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<BackendNotification[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get<BackendNotification[]>("/api/utilisateurs/admin/notifications", {
          withCredentials: true,
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Erreur chargement notifications", err);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        right: "280px",
        display: "flex",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={(e) => {
        // Prevent any accidental navigation
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Use a div instead of button to avoid form/submit issues */}
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen((prev) => !prev);
        }}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <BiMessageSquareDetail
          style={{
            color: "black",
            height: "38px",
            width: "38px",
          }}
        />
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          style={{
            position: "absolute",
            top: "50px",
            right: "0",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            width: "250px",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {notifications.map((notif) => (
              <li
                key={notif._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  padding: "6px 0",
                }}
              >
                {notif.type === "pharmacist_login" ? (
                  <FaUserMd style={{ color: "black" }} />
                ) : (
                  <FaFlag style={{ color: "black" }} />
                )}
                <div>
                  <span>
                    {notif.type === "post_report"
                      ? `Signalé par ${notif.signalePar?.email || "Inconnu"}`
                      : `Connexion: ${notif.pharmacien?.email || "Inconnu"}`}
                  </span>
                  <br />
                  <span style={{ fontSize: "12px", color: "gray" }}>
                    {timeAgo(notif.dateCreation)}
                  </span>
                </div>
              </li>
            ))}
            {notifications.length === 0 && (
              <li style={{ fontSize: "14px", color: "gray" }}>Aucune notification</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationButton;
