import React from 'react';

function Button({ 
  text = "click me", 
  onClick = () => {}, 
  type = "button", 
  className = "",
  width = "auto",
  height = "auto",
  borderRadius = "50%", 
  fontSize = "20px", // Increased font size
  icon = null, // Optional icon prop
}: { 
  text?: React.ReactNode;
  onClick?: () => void; 
  type?: "button" | "submit" | "reset"; 
  className?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  fontSize?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "transparent",
        border: "2px solid #74A69D", 
        padding: 5, 
        fontSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10mm", // 1cm spacing between icon and text
        transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
      className={`${className}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.2)";
        e.currentTarget.style.backgroundColor = "#BBBBBB";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
