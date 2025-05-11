// import { useState } from "react";
// import InputField from "../Components/InputField"; 
// import Button from "../Components/Button";

// function ForgotPassword() {
//   const [code, setCode] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your verification logic here
//     console.log("Verification code submitted:", code);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded shadow-md ">
//         <div className="flex flex-row w-full justify-center items-center text-green-500">
//       <h1 className="text-2xl font-bold mb-4">Verification Code</h1>
//         </div>
//       <p className="text-gray-700 mb-2">
//         Enter the verification code sent to your email to continue.
//       </p>
//       <form onSubmit={handleSubmit} className="space-y-4">
        
//         <InputField
//           type="text"
//           value={code}
//           placeholder="Enter your code"
//           onChange={(e) => setCode(e.target.value)}
//           required={true}
//         />
//         <p className="text-gray-500 text-sm mb-4">
//         The code will expire in <span className="font-medium">60 seconds</span>. If you didn’t receive it, you can request a new code below.
//         </p>
//         <div className="flex flex-row w-full justify-end items-center">
//         <Button type="submit" text="Verify" className="bg-green-500 hover:bg-green-700 text-white"/>
//         </div>
//       </form>

//       <p className="text-sm text-gray-500 mt-4">
//         Didn't receive the code?{" "}
//         <button
//           type="button"
//           className="text-green-500 underline hover:text-blue-700"
//           onClick={() => {
//             // Add resend code logic here
//             console.log("Resend code clicked");
//           }}
//         >
//           Send again
//         </button>
//       </p>
//     </div>
//   );
// }

// export default ForgotPassword;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField"; 
import Button from "../Components/Button";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: verification code, 3: new password
  const [token, setToken] = useState(""); // Pour stocker le token de réinitialisation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  
  const navigate = useNavigate();

  // Fonction pour demander un code de réinitialisation
  const requestResetCode = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/mot-de-passe-oublie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Une erreur s'est produite");
      }
      
      // Si succès, passer à l'étape suivante
      setStep(2);
      startCountdown();
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction pour démarrer le compte à rebours de 60 secondes
  const startCountdown = () => {
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Fonction pour vérifier le code
  const verifyCode = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");
    
    try {
      // Vérifier le token reçu par email
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Code invalide");
      }
      
      // Si le code est valide, stocker le token et passer à l'étape suivante
      setToken(code); // Le code reçu est utilisé comme token
      setStep(3);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction pour réinitialiser le mot de passe
  const resetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/reinitialiser-mot-de-passe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          nouveauMotDePasse: newPassword 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Une erreur s'est produite");
      }
      
      // Redirection vers la page de connexion après réinitialisation réussie
      alert("Mot de passe réinitialisé avec succès!");
      navigate("/login");
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Rendu en fonction de l'étape actuelle
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center text-green-500">Récupération de mot de passe</h1>
            <p className="text-gray-700 mb-4">
              Entrez votre adresse email pour recevoir un code de réinitialisation.
            </p>
            <form onSubmit={requestResetCode} className="space-y-4">
              <InputField
                type="email"
                value={email}
                placeholder="Votre adresse email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              <div className="flex flex-row w-full justify-end items-center">
                <Button 
                  type="submit" 
                  text={loading ? "Envoi en cours..." : "Envoyer"} 
                  className="bg-green-500 hover:bg-green-700 text-white"
                  disabled={loading}
                />
              </div>
            </form>
          </>
        );
      
      case 2:
        return (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center text-green-500">Code de vérification</h1>
            <p className="text-gray-700 mb-4">
              Entrez le code de vérification envoyé à votre adresse email.
            </p>
            <form onSubmit={verifyCode} className="space-y-4">
              <InputField
                type="text"
                value={code}
                placeholder="Entrez le code"
                onChange={(e) => setCode(e.target.value)}
                required={true}
              />
              <p className="text-gray-500 text-sm mb-4">
                Le code expirera dans <span className="font-medium">{countdown} secondes</span>.
              </p>
              <div className="flex flex-row w-full justify-end items-center">
                <Button 
                  type="submit" 
                  text={loading ? "Vérification..." : "Vérifier"} 
                  className="bg-green-500 hover:bg-green-700 text-white"
                  disabled={loading}
                />
              </div>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              Vous n'avez pas reçu le code?{" "}
              <button
                type="button"
                className="text-green-500 underline hover:text-green-700"
                onClick={requestResetCode}
                disabled={loading || countdown > 0}
              >
                {countdown > 0 ? `Réessayer dans ${countdown}s` : "Renvoyer le code"}
              </button>
            </p>
          </>
        );
      
      case 3:
        return (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center text-green-500">Nouveau mot de passe</h1>
            <p className="text-gray-700 mb-4">
              Veuillez définir votre nouveau mot de passe.
            </p>
            <form onSubmit={resetPassword} className="space-y-4">
              <InputField
                type="password"
                value={newPassword}
                placeholder="Nouveau mot de passe"
                onChange={(e) => setNewPassword(e.target.value)}
                required={true}
              />
              <InputField
                type="password"
                value={confirmPassword}
                placeholder="Confirmez le mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
              <div className="flex flex-row w-full justify-end items-center">
                <Button 
                  type="submit" 
                  text={loading ? "Réinitialisation..." : "Réinitialiser"} 
                  className="bg-green-500 hover:bg-green-700 text-white"
                  disabled={loading}
                />
              </div>
            </form>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 rounded shadow-md">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {renderStepContent()}
      
      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-4 text-green-500 hover:underline"
        >
          Retour
        </button>
      )}
    </div>
  );
}

export default ForgotPassword;