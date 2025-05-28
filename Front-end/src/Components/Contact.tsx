import React, { useState } from "react";
import PhoneInput from "./phonenumber";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";




const ALGERIAN_BALADIATES = ["Algiers","Constantine", "Batna","Sétif","Djelfa","Annaba","Sidi Aïssa","Sidi Bel Abbès","Biskra","Tébessa","Ouargla","El Khroub","Tiaret",
  "Bejaïa","Tlemcen","Bir el Djir","Bordj Bou Arreridj","Béchar","Blida","Skikda","Souk Ahras","Chlef","El Eulma","Bordj el Kiffan","Mostaganem","Touggourt","Médéa",
  "Tizi Ouzou","El Oued","Laghouat","M’Sila","Jijel","Relizane","Saïda","Baraki","Guelma","Ghardaïa","Aïn Beïda","Maghnia",
  "Bou Saâda","Bou Saada","Mascara","Khenchela","Barika","Messaad","Aflou","Aïn Oussera","Oran","Es Senia","Bab Ezzouar","Tamanrasset","Arzew","Aïn M’Lila","El Bayadh",
  "Mohammadia","Khemis Miliana","Hamma Bouziane","Dar el Beïda","Oum el Bouaghi","Taher","Birkhadem","Khemis el Khechna","Aïn Temouchent","Tissemsilt","Sig","Mila","Bouira",
  "Adrar","Ksar el Boukhari","Reghaïa","Aïn Defla", "Bordj Menaïel","Oued Rhiou","Assi Bou Nif","Ouled Djellal","Tighenif","Rouiba","Kolea","Baba Hassen","Lakhdaria","Sidi ech Chahmi",
  "El Attaf","Boufarik","Boudouaou","Oulad Yaïch","Ksar Chellala","Akbou","Zeralda","’Aïn Merane","’Aïn el Turk","Saoula","El Meghaïer",
  "Oued Sly","Douera","Ouled Moussa","Tindouf","Miliana","Beni Saf","El Affroun","Oued Fodda","Boumerdes","Meftah","Sidi Moussa","El Golea",
  "Magra","Staoueli","Draa el Mizan","Emîr Abdelkader","Bougara","Souma","Ouled Beni Messous","Collo","Tebesbest","Aïn Taya","Beni Tamou",
  "Ghazaouet","Didouche Mourad","El Arrouch","Timimoun","Aïn el Bya","I-n-Salah","Bougaa","Draa Ben Khedda","Boghni","Birtouta","Chabet el Ameur","Tizi Gheniff",
  "L’Arbaa Naït Irathen","Ouled Haddaj","Tazmalt","Mouzaïa","Sidi Lakhdar", "Isser","Bordj el Bahri","Ouled Fayet","Ouled Slama Tahta","El Abadia", "Zemmouri","Kaous",
  "El Tarf","Tipasa","Beni Amrane","Illizi","Bordj Mokhtar","Naama","Djanet","Beni Abbès","In Guezzam"
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
  type SocialPlatform = 'facebook' | 'instagram' | 'whatsapp';

  const [socialLinks, setSocialLinks] = useState<Record<SocialPlatform, string>>({
    facebook: "",
    instagram: "",
    whatsapp: "",
  });

  const [errors, setErrors] = useState<Record<SocialPlatform, boolean>>({
    facebook: false,
    instagram: false,
    whatsapp: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, platform: SocialPlatform) => {
    setSocialLinks({ ...socialLinks, [platform]: e.target.value });
  };

  const handleBlur = (platform: SocialPlatform) => {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.]*)?)?$/;
    setErrors({ ...errors, [platform]: !urlPattern.test(socialLinks[platform]) });
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value.length > 0) {
      const filtered = ALGERIAN_BALADIATES.filter(wilaya =>
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

  // Basic validation
  if (!name || !price || !description) {
    alert("Please fill all required fields (Name, Price, Description)");
    return;
  }

  const formData = new FormData();
  formData.append("nom", name);
  formData.append("prix", price);
  formData.append("description", description);
  formData.append("phone", phone);
  formData.append("location", location);
  
  if (photoFile) formData.append("photo", photoFile);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    const response = await fetch("http://localhost:5000/api/produit/produits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post product");
    }

    const data = await response.json();
    alert("Product posted successfully!");
    // Reset form
    setName("");
    setPrice("");
    setDescription("");
    setPhotoFile(null);
    setLocation("");
  } catch (error) {
    console.error("Error:", error);
    alert((error as any).message || "Failed to post product");
  }
};
  return (
    <div style={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px",color:"rgb(27, 127, 27)" , fontSize: "22px" }}>
        Poster un Produit
      </h2>

        <form style={{ maxWidth: "400px", margin: "0 auto" }} onSubmit={handleSubmit}>
{/* Name of Product */}
        <label style={{ display: "block", marginBottom: "5px" }}>
          Nom du Produit
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
        />

        {/* Price of Product */}
        <label style={{ display: "block", marginBottom: "5px" }}>
          Prix du Produit
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
        />

        {/* Description */}
        <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
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
          }}
        />

          {/* numero , links and  sociall*/}
          <label style={{ display: "block", marginBottom: "5px" }}>
          Ajouter votre  Contact
        </label>
        
        {/* Facebook */}
        <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <FaFacebook style={{ color: "#1877F2", fontSize: "24px", marginRight: "10px" }} />
            <input
              type="text"
              value={socialLinks.facebook}
              onChange={(e) => handleChange(e, 'facebook')}
              onBlur={() => handleBlur('facebook')}
              placeholder="https://facebook.com/yourprofile"
              style={{
                flex: 1,
                padding: "3px",
                borderRadius: "5px",
                border: errors.facebook ? "1px solid red" : "1px solid #BBBBBB",
              }}
            />
          </div>
          {errors.facebook && (
            <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 34px" }}>
              Please enter a valid URL (e.g., https://facebook.com/yourprofile)
            </p>
          )}
        </div>
        
        {/* Instagram */}
        <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <FaInstagram style={{ color: "#E4405F", fontSize: "24px", marginRight: "10px" }} />
            <input
              type="text"
              value={socialLinks.instagram}
              onChange={(e) => handleChange(e, 'instagram')}
              onBlur={() => handleBlur('instagram')}
              placeholder="https://instagram.com/yourprofile"
              style={{
                flex: 1,
                padding: "3px",
                borderRadius: "5px",
                border: errors.instagram ? "1px solid red" : "1px solid #BBBBBB",
              }}
            />
          </div>
          {errors.instagram && (
            <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 34px" }}>
              Please enter a valid URL (e.g., https://instagram.com/yourprofile)
            </p>
          )}
        </div>
        
        {/* WhatsApp */}
        <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <FaWhatsapp style={{ color: "#25D366", fontSize: "24px", marginRight: "10px" }} />
            <input
              type="text"
              value={socialLinks.whatsapp}
              onChange={(e) => handleChange(e, 'whatsapp')}
              onBlur={() => handleBlur('whatsapp')}
              placeholder="https://wa.me/1234567890 or phone number"
              style={{
                flex: 1,
                padding: "3px",
                borderRadius: "5px",
                border: errors.whatsapp ? "1px solid red" : "1px solid #BBBBBB",
              }}
            />
          </div>
          {errors.whatsapp && (
            <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 34px" }}>
              Please enter a valid WhatsApp link (e.g., https://wa.me/1234567890) or phone number
            </p>
          )}
        </div>

        {/* Phone Number */}
        <label style={{ display: "block", marginBottom: "5px" }}>Phone Number</label>
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

       {/* Loction */}
<div style={{ marginBottom: "15px", position: "relative" }}>
  <label style={{ display: "block", marginBottom: "5px" }}>Location</label>
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
    <ul style={{
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
      listStyle: "none"
    }}>
      {suggestions.map((wilaya, index) => (
        <li
          key={index}
          onClick={() => selectSuggestion(wilaya)}
          className="suggestion-item"
          style={{
            padding: "8px",
            cursor: "pointer",
            borderBottom: "1px solid #eee"
          }}
        >
          {wilaya}
        </li>
      ))}
    </ul>
  )}
</div>

        {/* Add Picture & Post Buttons */}
<div style={{ display: "flex", justifyContent: "space-between" }}>
  {/* Hidden file input */}
  <input
    type="file"
    id="photoInput"
    accept="image/*"  // Only accept image files
    hidden
    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
  />
  
  {/* Visible button that triggers file input */}
  <button
    type="button"
    onClick={() => document.getElementById('photoInput')?.click()}
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
            style={{
              backgroundColor: "#74A69D",
              color: "white",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Poster
          </button>
          {photoFile && (
  <div style={{ marginBottom: "15px" }}>
    <img 
      src={URL.createObjectURL(photoFile)}
      alt="Preview"
      style={{ maxWidth: "100%", maxHeight: "200px" }}
    />
  </div>
)}
      </div>
      </form>
    </div>
  );
}

export default ContactForm;