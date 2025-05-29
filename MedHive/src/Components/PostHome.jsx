import { useState} from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

function PostHome({ imageSrc, product, price, description, id, onDelete, vendeur }) {
  const [showDetail, setShowDetail] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const adress ="Alger centre"
  // Pour la description tronquée
  
  const toggleDetail = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowDetail(!showDetail);
  };

  //Modifier
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/post/${id}`);
  };
  
  const handleUser = (e) => {
    e.stopPropagation();
    navigate(`/ProfilePage/${vendeur}`);
  };
  
  //suppression
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDelete appelé pour le produit ID:", id);
    
    if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      console.log("Suppression confirmée, envoi de la requête DELETE à l'API");
      
      fetch(`http://localhost:5000/api/produit/produits/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        mode: 'cors',
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            console.log("Erreur de l'API:", data);
            throw new Error(data.message || "Erreur inconnue");
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Succès de la suppression:", data);
        
        alert("Produit supprimé avec succès!");
        navigate("/");
        if (onDelete) onDelete();  
      })
      .catch(err => {
        console.error("Erreur complète:", err);
        alert("Erreur lors de la suppression: " + err.message);
      });
    }
  };

  //signalement
  const handleSignal = (e) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;
    e.preventDefault();
    e.stopPropagation();

    if (!email) {
      alert("Utilisateur non connecté !");
      return;
    }

    //confirmer le signalement
    const reason = prompt("Veuillez indiquer la raison du signalement:");
    
    if (reason) {
      fetch(`http://localhost:5000/api/utilisateur/signalement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason, email }),
      })
      .then(response => {
        if (response.ok) {
          alert("Post signalé avec succès. Merci pour votre vigilance.");
        } else {
          alert("Erreur lors du signalement");
        }
      })
      .catch(err => {
        console.error("Erreur:", err);
        alert("Erreur lors du signalement");
      });
    }
  };

  return (
    <>
      {/*Card principale*/}
      <div 
        className="min-w-64 max-w-64 h-79 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out border border-green-100 cursor-pointer"
        onClick={toggleDetail}
      >
        <img
          className="h-40 w-full object-cover rounded-t-lg"
          src={imageSrc}
          alt={`${product}`}
        />
        
        <div className="p-3 space-y-1">
          <div className="flex justify-between items-center">
            <p className="text-base font-bold truncate max-w-40">{product}</p>
            <p className="text-base font-bold text-green-700">{price}</p>
          </div>
          
          {/* Description tronquée dans la carte principale */}
          <div className="h-14 overflow-hidden text-sm text-gray-700 mt-1">
            <p className="whitespace-pre-wrap line-clamp-2">{description}</p>
            {description.length > 80 && (
              <span className="text-gray-500 text-sm">...</span>)}
            <p className="whitespace-pre-wrap line-clamp-2">{adress}</p>
          </div>
          
          <div className="flex justify-end items-center gap-2 mt-2">
            {/* Bouton signaler pour tous les utilisateurs */}
            <button
              className="hover:bg-green-100 p-1.5 rounded-full transition"
              title="Vendeur"
              onClick={handleUser}
            >
              <i className="fa-solid fa-user text-green-500 text-sm"></i>
            </button>
            <button
              className="hover:bg-red-100 p-1.5 rounded-full transition"
              title="Signaler"
              onClick={handleSignal}
            >
              <i className="fa-solid fa-triangle-exclamation text-orange-300 text-sm"></i>
            </button>
            
            {/*Btns pour les users auth uniqmnt */}
            {isAuthenticated && (
              <>
                <button
                  className="hover:bg-blue-100 p-1.5 rounded-full transition"
                  title="Modifier"
                  onClick={handleEdit}
                >
                  <i className="fa-solid fa-pen-to-square text-blue-500 text-sm"></i>
                </button>
                <button
                  className="hover:bg-red-100 p-1.5 rounded-full transition"
                  title="Supprimer"
                  onClick={handleDelete}
                >
                  <i className="fa-solid fa-trash text-red-500 text-sm"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/*details en modal*/}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm"
            onClick={toggleDetail}
          ></div>
          
          <div className="relative bg-white rounded-xl shadow-xl max-w-xl w-full max-h-screen overflow-auto z-50 m-4">
            {/* Bouton de fermeture */}
            <button 
              onClick={toggleDetail}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <i className="fa-solid fa-xmark text-gray-600"></i>
            </button>

            <img
              className="w-full h-64 object-cover rounded-t-xl"
              src={imageSrc}
              alt={`${product}`}
            />
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{product}</h2>
                <p className="text-xl font-bold text-green-700">{price}</p>
              </div>
              
              {/* Description complète dans la modal */}
              <div className="text-gray-700 mb-6">
                <p className="whitespace-pre-wrap">{description}</p>
                <p className="whitespace-pre-wrap">{adress}</p>
              </div>
              
              
              <div className="flex justify-end gap-3">
                <button 
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-2 transition"
                  onClick={handleUser}
                >
                  <i className="fa-solid fa-user text-blue-500"></i>
                  <span>Vendeur</span>
                </button>

                <button 
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-2 transition"
                  onClick={handleSignal}
                >
                  <i className="fa-solid fa-triangle-exclamation text-orange-300"></i>
                  <span>Signaler</span>
                </button>
                
                {isAuthenticated && (
                  <>
                    <button 
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-2 transition"
                      onClick={handleEdit}
                    >
                      <i className="fa-solid fa-pen-to-square text-blue-500"></i>
                      <span>Modifier</span>
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-2 transition"
                      onClick={handleDelete}
                    >
                      <i className="fa-solid fa-trash text-red-500"></i>
                      <span>Supprimer</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostHome;