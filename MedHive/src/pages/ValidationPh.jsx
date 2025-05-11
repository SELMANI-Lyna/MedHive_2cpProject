import InputField from "../Components/InputField";
import { useState } from "react";
import Button from "../Components/Button";
import { Link } from 'react-router-dom';
import myImage from '../images/pharmacien22.png';
import PhoneInput from "../Components/PhoneInput";
import ConfirmPassword from "../Components/ConfirmPassword";
import LicenceUpload from "../Components/LicenceUpload";
import SubmitButton from "../Components/SubmitButton";
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../hooks/AuthContext";


function SignUpPh() {
  // const {login} =useAuth();
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [work, setWork] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [licence, setLicence] = useState('');  // Licence spécifique pour Pharmacien
  const [pharmacyName, setPharmacyName] = useState('');  // Nom de la pharmacie spécifique pour Pharmacien
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSignUpPh = async (event) => {
    event.preventDefault();
  
    if (!isPhoneValid || !isPasswordValid) {
      alert("Please fix the validation errors before submitting.");
      return;
    }
  
    const formData = {
      // username: '',
      email,
      motDePasse : password,
      telephone: phonenumber,
      role: 'Pharmacien',  
      // photoProfil: "", 
      localisation:location,
      tempsDeTravail: work,
      licence: "licence",
      nomPharmacie: pharmacyName,  // Nom de la pharmacie
      compteValide: false,  
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/inscription/pharmacien", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        alert("Votre compte est en attente de validation par un administrateur.");
      } else {
        console.error("Error:", response.statusText);
        alert("Failed to sign up. Please try again!");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please try again later!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
    <div className="max-w-4xl mx-auto my-20 flex flex-col md:flex-row gap-20 p-4 md:p-8 bg-white rounded-2xl shadow-md w-full">

      <div className=" flex-1 basis-1/2 flex flex-col justify-center items-center">
        <Link to="/" className="text-3xl font-bold text-green-500 hover:text-green-700">MedHive.com</Link>
        <div>
          <img src={myImage} alt="Pharmacist concept illustration" />
        </div>
        <p className="font-bold">Get started as a Pharmacist!</p>
        <p className="text-gray-600 bg-green-50 border-4 border-transparent rounded-lg px-4 py-2 mt-2">Become part of our pharmacy network, ensuring better healthcare and access to medicines.</p>
      </div>

      <div className=" flex-1 basis-1/2 flex flex-col justify-center">
        <h1 className=" text-2xl font-bold">Sign up as Pharmacist</h1>

        <div className="flex flex-row gap-13 justify-around mt-3 mb-3">
          <p className="text-gray-500">Already have an account?</p>
          <Link to="/sign-in" className="text-green-500 underline">Sign in</Link>
        </div>

        <form onSubmit={handleSignUpPh} className="flex flex-col">
         <InputField
            label={"Pharmacy Name"}
            type="text"
            value={pharmacyName}
            placeholder={"Enter your pharmacy name"}
            onChange={(e) => setPharmacyName(e.target.value)}
            required={true}
          />

          <InputField
            label={"Email"}
            type="email"
            value={email}
            placeholder={"Enter your email"}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <InputField
            label={"Adress"}
            type="text"
            value={location}
            placeholder={"Enter your adress"}
            onChange={(e) => setLocation(e.target.value)}
            required={true}
          />
          <InputField
            label={"Working Hours"}
            type="text"
            value={work}
            placeholder={"Enter your adress"}
            onChange={(e) => setWork(e.target.value)}
            required={true}
          />

          <PhoneInput onPhoneChange={setPhonenumber} setIsValid={setIsPhoneValid} />

          <LicenceUpload onLicenceChange={setLicence} />

          <ConfirmPassword onPasswordChange={setPassword} setIsValid={setIsPasswordValid} />
          <div className="mt-4">
           <label className="text-500">
            <input type="checkbox" required className="mr-2" />
            I agree to the <Link className="text-green-500 underline" to="/terms">Terms of use</Link>
            </label>
          </div>
          <br />
          <SubmitButton
            type="submit"
            text="Sign Up"
            onClick={handleSignUpPh}
            className="bg-green-500 hover:bg-green-700 text-white"
          />
        </form>

        {/* <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
          <div style={{ borderTop: "1.5px solid #888", flexGrow: 1 }}></div>
          <span style={{ margin: "0 10px", color: "#000" }}>OR</span>
          <div style={{ borderTop: "1.5px solid #888", flexGrow: 1 }}></div>
        </div>

        <Button text={<div><i className="fa-brands fa-google"></i> Continue with Google </div>} className="bg-gray-100 text-gray-600" />
        <Button text={<div><i className="fa-brands fa-facebook"></i> Continue with Facebook </div>} className="bg-gray-100 text-gray-600 mt-2" /> */}
      </div>
    </div>
    </div>
  )
}

export default SignUpPh;
