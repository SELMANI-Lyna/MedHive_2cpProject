import { useState, useEffect, useRef } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaUserMd, FaFlag } from "react-icons/fa";

interface Notification {
  message: string;
  type: "pharmacist_login" | "post_report";
  timestamp: string;
}

// Default sample notifications
const defaultNotifications: Notification[] = [
  {
    message: "Dr. Smith has logged in",
    type: "pharmacist_login",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
  },
  {
    message: "Post #1242 was reported",
    type: "post_report",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
];

interface NotificationButtonProps {
  notifications?: Notification[];
}

const timeAgo = (timestamp: string) => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const difference = Math.floor((now.getTime() - notificationTime.getTime()) / 1000);
  
  if (difference < 60) return `${difference} seconds ago`;
  if (difference < 3600) return `${Math.floor(difference / 60)} minutes ago`;
  if (difference < 86400) return `${Math.floor(difference / 3600)} hours ago`;
  return `${Math.floor(difference / 86400)} days ago`;
};

function NotificationButton({ notifications = defaultNotifications }: NotificationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute", // Place on the same line as other elements
        top: "15px", // Align at the top of the pagepcpx
        right: "280px", // Align to the far-right side
        display: "flex", // Ensure it's properly aligned with other items
        alignItems: "center", // Center the button vertically
        zIndex: 1000,
        
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <BiMessageSquareDetail
          style={{
            color: "black",
            height: "38px",
            width: "38px", // Fixed size for consistent alignment
          }}
        />
      </button>

      {/* Notification Panel */}
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
          {/* Notification List */}
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {notifications.map((notif, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "19px",
                  padding: "5px 0",
                }}
              >
                {/* Icon Based on Notification Type */}
                {notif.type === "pharmacist_login" ? (
                  <FaUserMd style={{ color: "black" }} />
                ) : (
                  <FaFlag style={{ color: "black" }} />
                )}
                {/* Notification Message */}
                <span>{notif.message}</span>
                {/* Timestamp */}
                <p
                  style={{
                    fontSize: "12px",
                    color: "gray",
                    marginLeft: "auto",
                  }}
                >
                  {timeAgo(notif.timestamp)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


export default NotificationButton;