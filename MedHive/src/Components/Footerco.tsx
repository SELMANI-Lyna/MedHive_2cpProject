function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#74A69D",
        color: "#FFFFFF",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>MedHive.com</h1>
      <p style={{ margin: "10px 0", fontSize: "14px" }}>
        This website was created in 2025 by a group of students from ESTIN as
        part of their module project. It allows users to search for and buy
        non-prescription medicines from pharmacists and other customers,
        making medicine shopping easier and more accessible.
      </p>

      {/* Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "15px 0",
          fontSize: "14px",
        }}
      >
        <a href="#" style={{ color: "#FFFFFF" }}>
          Help Center
        </a>
        <a href="#" style={{ color: "#FFFFFF" }}>
          Our Pharmacists
        </a>
        <a href="#" style={{ color: "#FFFFFF" }}>
          Collaborations
        </a>
        <a href="#" style={{ color: "#FFFFFF" }}>
          About Us
        </a>
      </div>

      {/* Contact Info */}
      <p style={{ fontSize: "14px" }}>Route nationale n° 75, Amizour – 06300 Béjaïa</p>
      <p style={{ fontSize: "14px" }}>Phone: 0164_203_819_327</p>

      {/* Social Media */}
      <div style={{ marginTop: "10px" }}>
        <i
          className="fa-brands fa-instagram"
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
        <i
          className="fa-brands fa-facebook"
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
        <i
          className="fa-brands fa-linkedin"
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
        <i
          className="fa-brands fa-pinterest"
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
      </div>
    </footer>
  );
}

export default Footer;
