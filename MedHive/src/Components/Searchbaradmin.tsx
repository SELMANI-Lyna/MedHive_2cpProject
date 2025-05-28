import { FaSearch } from 'react-icons/fa';
export default function Searchbar() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      padding: "10px 20px",
      boxSizing: "border-box",
    }}>
      <h1 style={{
        fontSize: "30px",
        fontWeight: "bold",
        color: "#18BF5E",
        margin: "0",
        marginRight: "20px",
        fontFamily: "Inter, sans-serif",
        alignSelf: "flex-start",
      }}>
        MedHive.com
      </h1>

      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          width: "70%",
          maxWidth: "600px",
        }}>
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
              marginLeft: "10px",
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
