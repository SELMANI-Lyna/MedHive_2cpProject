// import InputField from "../Components/InputField"
// import { useState } from "react";
// import Button from "../Components/Button";
// import {Link} from 'react-router-dom'
// import myImage from '../images/pharmacien111.avif'
// import SubmitButton from "../Components/SubmitButton";
// import { useNavigate } from 'react-router-dom';


// function SignIn() {

//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const handleSignIn = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
  
//     // try {
//     //   const response = await fetch('http://localhost:3000/connexion', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({ email, password }),
//     //   });
  
//     //   const data = await response.json();
  
//     //   if (!response.ok) {
//     //     alert(data.message || 'Connexion échouée');
//     //     return;
//     //   }
  
//     //   // ✅ Success: Save token and redirect
//     //   localStorage.setItem('token', data.token);
//     //   alert('Connexion réussie ! 🎉');
//     //   // Optionally redirect (you might use `useNavigate` from react-router-dom)
//     //   navigate('/');
//     // } catch (error) {
//     //   console.error('Erreur lors de la connexion:', error);
//     //   alert("Une erreur s'est produite lors de la connexion");
//     // }
//       try {
//         console.log('Données envoyées:', { email, motDePasse: password }); //test
//           const response = await fetch('http://localhost:5000/api/auth/connexion', { 
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ email, motDePasse: password }), 
//           });
  
//           const data = await response.json();
  
//           if (!response.ok) {
//               alert(data.message || 'Connexion échouée');
//               return;
//           }
  
//           localStorage.setItem('token', data.token);
  
//           alert('Connexion réussie ! 🎉');
  
//           //Rediriger l'utilisateur...
//           await navigate('/');
//       } catch (error) {
//           console.error('Erreur lors de la connexion:', error);
//           alert("Une erreur s'est produite lors de la connexion");
//       }
//   };
  
  
  
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
//         <div className="max-w-4xl mx-auto my-20 flex flex-col md:flex-row gap-20 p-4 md:p-8 bg-white rounded-2xl shadow-md w-full">

//           <div className=" flex-1 basis-1/2 flex flex-col justify-center items-center">
//             <Link to="/" className="text-3xl font-bold text-green-500 hover:text-green-700">MedHive.com</Link>
//             <div>
//             <img src={myImage} alt="Description of the image" />
//             </div>
//             <p className="font-bold">Welcome back!</p>
//             <p className="text-gray-600 bg-green-50 border-4 border-transparent rounded-lg px-4 py-2 mt-2">Your trusted online pharmacy hub, making medicine shopping easier, faster, and more reliable than ever!</p>
//           </div>

//           <div className=" flex-1 basis-1/2 flex flex-col justify-center">
//             <h1 className=" text-2xl font-bold">Sign In</h1>

//             <div className="flex flex-row gap-13 justify-around mt-3 mb-3">
//             <p className="text-gray-500">Don't have an account?</p>
//             <Link to="/register" className="text-green-500 underline">Create one</Link>
//             </div>

//             <form onSubmit={handleSignIn} className="flex flex-col">
//               <InputField
//               label={"Email"}
//               type="email"
//               value={email}
//               placeholder={"enter your email"}
//               onChange={(e) => setEmail(e.target.value)} required={true}/>

//               <InputField
//               label={"Password"}
//               type="password"
//               value={password}
//               placeholder={"enter your password"}
//               onChange={(e) => setPassword(e.target.value)}
//               required={true}
//               showToggle={true}/>

//               {/* this must point to some page */}
//               <Link to="/forgot-password" className="text-green-500 underline">Forgot password?</Link>
//               <br />

//               <SubmitButton
//                 text="Sign In" 
//                 type="submit" 
//                 className="bg-green-500 hover:bg-green-700 text-white"
//               />
//             </form>
//             <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
//             <div style={{ borderTop: "1.5px solid #888", flexGrow: 1 }}></div>
//             <span style={{ margin: "0 10px", color: "#000" }}>OR</span>
//             <div style={{ borderTop: "1.5px solid #888", flexGrow: 1 }}></div>
//             </div>

//             <Button text={<div><i className="fa-brands fa-google"></i> Continue with google </div>} className="bg-gray-100 text-gray-600"/>
//             <Button text={<div><i className="fa-brands fa-facebook"></i> Continue with facebook </div>} className="bg-gray-100 text-gray-600 mt-2"/>
//           </div>

//         </div>
//       </div>
//   )

// }

// export default SignIn
import InputField from "../Components/InputField"
import { useState, useEffect } from "react";
import Button from "../Components/Button";
import {Link} from 'react-router-dom'
import myImage from '../images/pharmacien111.avif'
import SubmitButton from "../Components/SubmitButton";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthContext";

function SignIn() {
  const {login} =useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Rediriger vers la page d'accueil si déjà connecté
      console.log(`${token}`);
      // navigate('/');
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      console.log('Données envoyées:', { email, motDePasse: password });
      
      const response = await fetch('http://localhost:5000/api/auth/connexion', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, motDePasse: password }), 
      });
      
      // Capturer le texte brut de la réponse
      const responseText = await response.text();
      console.log('Réponse brute:', responseText);
      
      // Tenter de parser en JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Données JSON:', data);
      } catch (e) {
        console.error('Impossible de parser en JSON:', e);
        setError("Réponse du serveur invalide");
        setLoading(false);
        return;
      }
      
      if (!response.ok) {
        setError(data.message || 'Connexion échouée');
        setLoading(false);
        return;
      }
      
      //stock token et infos user
      localStorage.setItem('token', data.token);
      
      // Si l'API renvoie des informations utilisateur, les stocker également
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      //Verifier valide?
      if (data.user && data.user.role === 'Pharmacien' && data.user.compteValide === false) {
        alert('Votre compte est en attente de validation par un administrateur.');
      } else {
        alert('Connexion réussie ! 🎉');
      }
      login(data.token);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError("Une erreur s'est produite lors de la connexion. Vérifiez votre connexion internet.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
      <div className="max-w-4xl mx-auto my-20 flex flex-col md:flex-row gap-20 p-4 md:p-8 bg-white rounded-2xl shadow-md w-full">

        <div className="flex-1 basis-1/2 flex flex-col justify-center items-center">
          <Link to="/" className="text-3xl font-bold text-green-500 hover:text-green-700">MedHive.com</Link>
          <div>
            <img src={myImage} alt="Description of the image" />
          </div>
          <p className="font-bold">Welcome back!</p>
          <p className="text-gray-600 bg-green-50 border-4 border-transparent rounded-lg px-4 py-2 mt-2">Your trusted online pharmacy hub, making medicine shopping easier, faster, and more reliable than ever!</p>
        </div>

        <div className="flex-1 basis-1/2 flex flex-col justify-center">
          <h1 className="text-2xl font-bold">Sign In</h1>

          <div className="flex flex-row gap-13 justify-around mt-3 mb-3">
            <p className="text-gray-500">Don't have an account?</p>
            <Link to="/register" className="text-green-500 underline">Create one</Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="flex flex-col">
            <InputField
              label={"Email"}
              type="email"
              value={email}
              placeholder={"enter your email"}
              onChange={(e) => setEmail(e.target.value)} 
              required={true}
            />

            <InputField
              label={"Password"}
              type="password"
              value={password}
              placeholder={"enter your password"}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              showToggle={true}
            />

            <Link to="/forgot-password" className="text-green-500 underline">Forgot password?</Link>
            <br />

            <SubmitButton
              text={loading ? "Connexion en cours..." : "Sign In"} 
              type="submit" 
              className="bg-green-500 hover:bg-green-700 text-white"
              disabled={loading}
            />
          </form>
          
          {/* <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
            <div style={{ borderTop: "1.5px solid #888", flexGrow: 1 }}></div>
            <span style={{ margin: "0 10px", color: "#000" }}>OR</span>
            <div style={{ borderTop: "1.5px solid #888", flexGrow: 1 }}></div>
          </div>

          <Button 
            text={<div><i className="fa-brands fa-google"></i> Continue with google </div>} 
            className="bg-gray-100 text-gray-600"
          />
          <Button 
            text={<div><i className="fa-brands fa-facebook"></i> Continue with facebook </div>} 
            className="bg-gray-100 text-gray-600 mt-2"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
