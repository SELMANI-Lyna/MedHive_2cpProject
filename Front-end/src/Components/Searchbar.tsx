import { FaSearch } from 'react-icons/fa'; // Changed pharmacist icon
export default function Searchbar() {
  return (
    <div
      style={{
        display: "flex", // Align items horizontally
        alignItems: "center", // Vertically center all elements
        width: "100%",
        position: "absolute", // Pin it at the very top
        top: "0", // Perfectly align at the top
        left: "0",
        padding: "10px 20px", // Add space around the container
        boxSizing: "border-box", // Prevent padding overflow
      }}
    >
      {/* Logo */}
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "#18BF5E",
          margin: "0", // Remove unnecessary spacing
          marginRight: "20px", // Control gap between logo and search bar
          fontFamily: "Inter, sans-serif",
          alignSelf: "flex-start", // Align logo at the very top
        }}
      >
        MedHive.com
      </h1>

      {/* Search Bar */}
      <div
        style={{
          flex: 1, // Ensure search bar takes up available space
          display: "flex",
          justifyContent: "center", // Center the search bar horizontally
          alignItems: "center", // Vertically center input and button
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "70%", // Adjust width for proper centering
            maxWidth: "600px", // Limit width on larger screens
          }}
        >
          <input
            type="text"
            placeholder="Search your products from here"
            style={{
              width: "100%",
              height: "41px",
              paddingLeft: "25px",
              borderColor: "#BBBBBB",
              backgroundColor: "#BBBBBB",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <FaSearch
            style={{
              position: "absolute",
              left: "575px",
              color: "grey",
              height: "20px",
              width: "20px",
            }}
          />
          <button
            style={{
              height: "45px",
              width: "100px",
              backgroundColor: "#74A69D",
              color: "white",
              borderRadius: "8px",
              border: "none",
              marginLeft: "10px", // Space between input and button
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
