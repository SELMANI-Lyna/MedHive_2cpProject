import { FaSearch } from "react-icons/fa"; // Changed pharmacist icon

export default function Header() {
  return (
    <div
      className="w-full bg-white shadow-md p-4 mg-auto rounded-lg"
      style={{ maxWidth: "100%", height: "auto" }}
    >
      <div className="flex flex-row items-center w-full mg-auto">
        {/* Logo */}
        <div className="w-32">
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#18BF5E",
              textAlign: "left",
              marginLeft: "100px",
              marginTop: "50px",
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
              fontFamily: "Inter, sans-serif",
              fontStyle: "semi-bold",
              marginBottom: "-40px",
            }}
          >
            MedHive.com
          </h1>
        </div>

        {/* Search Bar */}
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "100%",
            marginLeft: "-100px",
          }}
        >
          <div className="relative flex items-center">
            <div
              style={{
                position: "relative",
                width: "140%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Search your products from here"
                style={{
                  width: "100%",
                  height: "41px",
                  paddingLeft: "25px",
                  paddingRight: "200px",
                  borderColor: "#BBBBBB",
                  backgroundColor: "#BBBBBB",
                  opacity: "100%",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  boxShadow: "#BBBBBB",
                }}
              />
              <FaSearch
                style={{
                  position: "absolute",
                  left: "8px",
                  color: "grey",
                }}
              />
              <button
                style={{
                  position: "relative",
                  right: "10px",
                  height: "45px",
                  width: "30%",
                  backgroundColor: "#74A69D",
                  color: "white",
                  paddingLeft: "7px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
