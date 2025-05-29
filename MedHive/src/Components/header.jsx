import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Header({ onSearch }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleChat = () => {
    if (isAuthenticated) {
      navigate('/chatbot');
    } else {
      navigate('/loginchatbot');
      alert('You need to be signed in to perform this action');
    }
  };

  const baseBtnClass = "px-4 py-2 rounded-full transition text-sm font-medium";
  const hoverClass = "hover:bg-gray-200";

  return (
    <header className="bg-white shadow-md p-4">
      {/* Conteneur principal avec trois sections */}
      <div className="flex items-center justify-between">
        {/* Section gauche - Logo */}
        <div className="flex items-center gap-2 w-1/4">
          <i className="fa-solid fa-prescription-bottle-medical text-green-600 text-2xl mr-2"></i>
          <span className="text-2xl font-bold text-green-600">Medhive</span>
        </div>

        {/* Section centrale - Barre de recherche */}
        <div className="flex justify-center w-2/4">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Section droite - Boutons de navigation */}
        <div className="flex items-center justify-end gap-1 w-1/4">
          <button 
            onClick={handleChat} 
            className={`${baseBtnClass} ${hoverClass}`}
          >
            <i className="fa-solid fa-robot text-blue-500"></i> Chat bot
          </button>

          {!isAuthenticated ? (
            <>
              <Link
                to="/sign-in"
                className={`${baseBtnClass} ${hoverClass}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`${baseBtnClass} ${hoverClass}`}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate(`/ProfilePage/${userId}`)}
                className={`${baseBtnClass} ${hoverClass}`}
              >
                <i className="fa-solid fa-user-circle text-green-500"></i> Profile
              </button>
              <button
                onClick={logout}
                className={`${baseBtnClass} ${hoverClass} text-red-500`}
              >
                <i className="fa-solid fa-right-from-bracket mr-1"></i>Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}