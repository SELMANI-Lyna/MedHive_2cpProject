import InputField from "../Components/InputField"
import { useState } from "react";
import Button from "../Components/Button";
import {Link} from 'react-router-dom'
import myImage from '../images/Pharmacist-concept-illustration.png'
import PhoneInput from "../Components/PhoneInput";
import ConfirmPassword from "../Components/ConfirmPassword";
import SubmitButton from "../Components/SubmitButton";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";
// {
//   "email": "visiteur1@example.com",
//   "role": "Visiteur",
//   "telephone": "0600000000",
//   "username": "visiteur_test",
//   "password": "test1234"
// }

function SignUp() {
  const {login} =useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);//changed
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
  
    if (!isPhoneValid || !isPasswordValid) {
      alert("Please fix the validation errors before submitting.");
      return;
    }
  
    {/*const formData = {
      username,
      email,
      password,
      telephone: phonenumber,  // Mapping phonenumber to telephone for Visiteur
      role: 'Visiteur',
      photoProfil: "",  // Default empty value
      licence: "",  // Default empty value (since it's required for Pharmacien only)
      pharmacieId: "",  // Default empty value
      validé: true
    };
  
    try {
      const response = await fetch("http://localhost:3000/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        alert("Sign up successfully! 🎉");
        navigate('/');

      } else {
        console.error("Error:", response.statusText);
        alert("Failed to sign up. Please try again!");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please try again later!");
    }
  };*/}
  
      const formData = {
        username,
        email,
        motDePasse: password, 
        telephone: phonenumber, 
        role: 'Vendeur', 
        //  photoProfil: "", // Default empty value
        // licence: "", // Only needed for 'Pharmacien'
        //  nomPharmacie: "",
        //  localisation: "",
        //  tempsDeTravail: "",
        compteValide: true
    };

    try {
        const response = await fetch("http://localhost:5000/api/auth/inscription/vendeur", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to sign up.");
        }
        //stocker le token & données de user
        localStorage.setItem('token', data.token);
        if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        }
      

        login();
        console.log("Success:", data);
        alert("Sign up successfully! 🎉");
        await navigate('/'); // Ensuring smooth navigation post-signup
    } catch (error) {
        console.error("Network error:", error);
        alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
    <div className="max-w-4xl mx-auto my-20 flex flex-col md:flex-row gap-20 p-4 md:p-8 bg-white rounded-2xl shadow-md w-full">

      <div className=" flex-1 basis-1/2 flex flex-col justify-center items-center">
        <Link to="/" className="text-3xl font-bold text-green-500 hover:text-green-700">MedHive.com</Link>
        <div>
        <img src={myImage} alt="Description of the image" />
        </div>
        <p className="font-bold">Get started!</p>
        <p className="text-gray-600 bg-green-50 border-4 border-transparent rounded-lg px-4 py-2 mt-2">Your trusted online pharmacy hub, making medicine shopping easier, faster, and more reliable than ever!</p>
      </div>

      <div className=" flex-1 basis-1/2 flex flex-col justify-center">
        <h1 className=" text-2xl font-bold">Sign up</h1>

        <div className="flex flex-row gap-13 justify-around mt-3 mb-3">
        <p className="text-gray-500">Have an account?</p>
        <Link to="/sign-in" className="text-green-500 underline">Sign in</Link>
        </div>
      <form onSubmit={handleSignUp} className="flex flex-col">

        <InputField
        label={"Full name"}
        type="text"
        value={username}
        placeholder={"enter your username"}
        onChange={(e) => setUsername(e.target.value)}
        required={true}/>

        <InputField
        label={"Email"}
        type="email"
        value={email}
        placeholder={"enter your email"}
        onChange={(e) => setEmail(e.target.value)} required={true}/> 
        <PhoneInput onPhoneChange={setPhonenumber} setIsValid={setIsPhoneValid} />

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
          className="bg-green-500 hover:bg-green-700 text-white"
        />
      </form>
        {/* <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
          <div style={{ borderTop: "1.5px solid #888", flexGrow: 1 }}></div>
          <span style={{ margin: "0 10px", color: "#000" }}>OR</span>
          <div style={{ borderTop: "1.5px solid #888", flexGrow: 1 }}></div>
        </div>

        <Button text={<div><i className="fa-brands fa-google"></i> Continue with google </div>} className="bg-gray-100 text-gray-600"/>
        <Button text={<div><i className="fa-brands fa-facebook"></i> Continue with facebook </div>} className="bg-gray-100 text-gray-600 mt-2"/> */}
      </div>
    </div>
    </div>
  )

}

export default SignUp
