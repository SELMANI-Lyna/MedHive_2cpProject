function Buttonwithoutmargin({ 
  text = "click me", 
  onClick = () => {}, 
  type = "button", 
  className = "",
  style = {}, // ✅ Accept styles
}: { 
  text?: React.ReactNode;
  onClick?: () => void; 
  type?: "button" | "submit" | "reset"; 
  className?: string;
  style?: React.CSSProperties; // ✅ Define inline styles
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...style, // ✅ Apply custom styles dynamically
        backgroundColor: style.backgroundColor || "transparent",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
      }}
      className={`focus:outline-none ${className}`}
    >
      {text}
    </button>
  );
}

export default Buttonwithoutmargin;
