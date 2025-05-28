function Buttonwithoutmargin({ 
    text = "click me", 
    onClick = () => {}, 
    type = "button", 
    className = "",
    style = {}, // ✅ Accept styles
    disabled = false, // ✅ Add default value for disabled
  }: { 
    text?: React.ReactNode;
    onClick?: () => void; 
    disabled?: boolean;
    type?: "button" | "submit" | "reset"; 
    className?: string;
    style?: React.CSSProperties; // ✅ Define inline styles
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        
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