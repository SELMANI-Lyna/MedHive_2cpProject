import React, { useState } from "react";
import PhoneInput from "./phonenumber2";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ALGERIAN_BALADIATES = [
  "Algiers",
  "Constantine",
  "Batna",
  "Sétif",
  "Djelfa",
  "Annaba",
  "Sidi Aïssa",
  "Sidi Bel Abbès",
  "Biskra",
  "Tébessa",
  "Ouargla",
  "El Khroub",
  "Tiaret",
  // ... (keep all your existing cities)
  "Tipasa",
  "Beni Amrane",
  "Illizi",
  "Bordj Mokhtar",
  "Naama",
  "Djanet",
  "Beni Abbès",
  "In Guezzam",
];

function ContactForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  type SocialPlatform = "facebook" | "instagram" | "whatsapp";

  const [socialLinks, setSocialLinks] = useState<
    Record<SocialPlatform, string>
  >({
    facebook: "",
    instagram: "",
    whatsapp: "",
  });

  const [errors, setErrors] = useState<Record<SocialPlatform, boolean>>({
    facebook: false,
    instagram: false,
    whatsapp: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    platform: SocialPlatform
  ) => {
    setSocialLinks({ ...socialLinks, [platform]: e.target.value });
  };

  const handleBlur = (platform: SocialPlatform) => {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.]*)?)?$/;
    setErrors({
      ...errors,
      [platform]: !urlPattern.test(socialLinks[platform]),
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const filtered = ALGERIAN_BALADIATES.filter((wilaya) =>
        wilaya.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (wilaya: string) => {
    setLocation(wilaya);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!name || !price || !description) {
      alert("Please fill all required fields (Name, Price, Description)");
      setIsSubmitting(false);
      return;
    }

    // Create enhanced description
    let enhancedDescription = description;
    if (phone) enhancedDescription += `\n\nTéléphone: ${phone}`;
    if (location) enhancedDescription += `\nLocalisation: ${location}`;

    // Add social media links if they exist
    const socialMediaInfo = [
      socialLinks.facebook && `Facebook: ${socialLinks.facebook}`,
      socialLinks.instagram && `Instagram: ${socialLinks.instagram}`,
      socialLinks.whatsapp && `WhatsApp: ${socialLinks.whatsapp}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (socialMediaInfo)
      enhancedDescription += `\n\nRéseaux sociaux:\n${socialMediaInfo}`;

    // Prepare form data
    const formData = new FormData();
    formData.append("nom", name);
    formData.append("prix", price);
    formData.append("description", enhancedDescription);
    if (photoFile) formData.append("photo", photoFile);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/produit/produits",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type - let browser set it with boundary
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post product");
      }

      const data = await response.json();
      alert("Product posted successfully!");
      navigate("/");

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setPhotoFile(null);
      setLocation("");
      setPhone("");
      setSocialLinks({
        facebook: "",
        instagram: "",
        whatsapp: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert((error as Error).message || "Failed to post product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "rgb(27, 127, 27)",
          fontSize: "22px",
        }}
      >
        Poster un Produit
      </h2>

      <form
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        {/* Name of Product */}
        <label style={{ display: "block", marginBottom: "5px" }}>
          Nom du Produit *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #BBBBBB",
          }}
          required
        />

        {/* Price of Product */}
        <label style={{ display: "block", marginBottom: "5px" }}>
          Prix du Produit *
        </label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #BBBBBB",
          }}
          required
        />

        {/* Description */}
        <label style={{ display: "block", marginBottom: "5px" }}>
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #BBBBBB",
            minHeight: "80px",
          }}
          required
        />

        {/* Social Media Links */}
        <label style={{ display: "block", marginBottom: "5px" }}>
          Ajouter votre Contact
        </label>

        {/* Facebook */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <FaFacebook
              style={{
                color: "#1877F2",
                fontSize: "24px",
                marginRight: "10px",
              }}
            />
            <input
              type="text"
              value={socialLinks.facebook}
              onChange={(e) => handleChange(e, "facebook")}
              onBlur={() => handleBlur("facebook")}
              placeholder="https://facebook.com/yourprofile"
              style={{
                flex: 1,
                padding: "3px",
                borderRadius: "5px",
                border: errors.facebook ? "1px solid red" : "1px solid #BBBBBB",
              }}
            />
          </div>
          {errors.facebook && socialLinks.facebook && (
            <p
              style={{ color: "red", fontSize: "12px", margin: "5px 0 0 34px" }}
            >
              Please enter a valid URL
            </p>
          )}
        </div>

        {/* Instagram */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <FaInstagram
              style={{
                color: "#E4405F",
                fontSize: "24px",
                marginRight: "10px",
              }}
            />
            <input
              type="text"
              value={socialLinks.instagram}
              onChange={(e) => handleChange(e, "instagram")}
              onBlur={() => handleBlur("instagram")}
              placeholder="https://instagram.com/yourprofile"
              style={{
                flex: 1,
                padding: "3px",
                borderRadius: "5px",
                border: errors.instagram
                  ? "1px solid red"
                  : "1px solid #BBBBBB",
              }}
            />
          </div>
          {errors.instagram && socialLinks.instagram && (
            <p
              style={{ color: "red", fontSize: "12px", margin: "5px 0 0 34px" }}
            >
              Please enter a valid URL
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <FaWhatsapp
              style={{
                color: "#25D366",
                fontSize: "24px",
                marginRight: "10px",
              }}
            />
            <input
              type="text"
              value={socialLinks.whatsapp}
              onChange={(e) => handleChange(e, "whatsapp")}
              onBlur={() => handleBlur("whatsapp")}
              placeholder="https://wa.me/1234567890"
              style={{
                flex: 1,
                padding: "3px",
                borderRadius: "5px",
                border: errors.whatsapp ? "1px solid red" : "1px solid #BBBBBB",
              }}
            />
          </div>
          {errors.whatsapp && socialLinks.whatsapp && (
            <p
              style={{ color: "red", fontSize: "12px", margin: "5px 0 0 34px" }}
            >
              Please enter a valid WhatsApp link
            </p>
          )}
        </div>

        {/* Phone Number */}
        <label style={{ display: "block", marginBottom: "5px" }}>
          Phone Number
        </label>
        <div
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #BBBBBB",
          }}
        >
          <PhoneInput onPhoneChange={(value: string) => setPhone(value)} />
        </div>

        {/* Location */}
        <div style={{ marginBottom: "15px", position: "relative" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Entrer votre wilaya"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #BBBBBB",
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: "1px solid #BBBBBB",
                borderRadius: "5px",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 1000,
                marginTop: "2px",
                padding: 0,
                listStyle: "none",
              }}
            >
              {suggestions.map((wilaya, index) => (
                <li
                  key={index}
                  onClick={() => selectSuggestion(wilaya)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {wilaya}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Photo Preview */}
        {photoFile && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={URL.createObjectURL(photoFile)}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "5px",
              }}
            />
          </div>
        )}

        {/* Form Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="file"
            id="photoInput"
            accept="image/*"
            hidden
            onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
          />

          <button
            type="button"
            onClick={() => document.getElementById("photoInput")?.click()}
            style={{
              backgroundColor: "#BBBBBB",
              color: "white",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              border: "none",
            }}
          >
            {photoFile ? "Change Pic" : "Add Pic"}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: "#74A69D",
              color: "white",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              border: "none",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? "Posting..." : "Poster"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
