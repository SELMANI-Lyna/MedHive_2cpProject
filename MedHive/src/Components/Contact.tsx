import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

// Composant PhoneInput simple pour remplacer l'import manquant
const PhoneInput = ({ onPhoneChange }) => {
  const [phone, setPhone] = useState("");
  
  const handleChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    onPhoneChange(value);
  };
  
  return (
    <input
      type="tel"
      value={phone}
      onChange={handleChange}
      placeholder="+213 XX XXX XXXX"
      style={{
        width: "100%",
        padding: "8px",
        border: "none",
        outline: "none",
        background: "transparent"
      }}
    />
  );
};

const ALGERIAN_BALADIATES = [
  "Algiers", "Constantine", "Batna", "Sétif", "Djelfa", "Annaba", "Sidi Aïssa", 
  "Sidi Bel Abbès", "Biskra", "Tébessa", "Ouargla", "El Khroub", "Tiaret", 
  "Bejaïa", "Tlemcen", "Bir el Djir", "Bordj Bou Arreridj", "Béchar", "Blida", 
  "Skikda", "Souk Ahras", "Chlef", "El Eulma", "Bordj el Kiffan", "Mostaganem", 
  "Touggourt", "Médéa", "Tizi Ouzou", "El Oued", "Laghouat", "M'Sila", "Jijel", 
  "Relizane", "Saïda", "Baraki", "Guelma", "Ghardaïa", "Aïn Beïda", "Maghnia", 
  "Bou Saâda", "Bou Saada", "Mascara", "Khenchela", "Barika", "Messaad", "Aflou", 
  "Aïn Oussera", "Oran", "Es Senia", "Bab Ezzouar", "Tamanrasset", "Arzew", 
  "Aïn M'Lila", "El Bayadh", "Mohammadia", "Khemis Miliana", "Hamma Bouziane", 
  "Dar el Beïda", "Oum el Bouaghi", "Taher", "Birkhadem", "Khemis el Khechna", 
  "Aïn Temouchent", "Tissemsilt", "Sig", "Mila", "Bouira", "Adrar", 
  "Ksar el Boukhari", "Reghaïa", "Aïn Defla", "Bordj Menaïel", "Oued Rhiou", 
  "Assi Bou Nif", "Ouled Djellal", "Tighenif", "Rouiba", "Kolea", "Baba Hassen", 
  "Lakhdaria", "Sidi ech Chahmi", "El Attaf", "Boufarik", "Boudouaou", 
  "Oulad Yaïch", "Ksar Chellala", "Akbou", "Zeralda", "Aïn Merane", 
  "Aïn el Turk", "Saoula", "El Meghaïer", "Oued Sly", "Douera", "Ouled Moussa", 
  "Tindouf", "Miliana", "Beni Saf", "El Affroun", "Oued Fodda", "Boumerdes", 
  "Meftah", "Sidi Moussa", "El Golea", "Magra", "Staoueli", "Draa el Mizan", 
  "Emîr Abdelkader", "Bougara", "Souma", "Ouled Beni Messous", "Collo", 
  "Tebesbest", "Aïn Taya", "Beni Tamou", "Ghazaouet", "Didouche Mourad", 
  "El Arrouch", "Timimoun", "Aïn el Bya", "I-n-Salah", "Bougaa", 
  "Draa Ben Khedda", "Boghni", "Birtouta", "Chabet el Ameur", "Tizi Gheniff", 
  "L'Arbaa Naït Irathen", "Ouled Haddaj", "Tazmalt", "Mouzaïa", "Sidi Lakhdar",