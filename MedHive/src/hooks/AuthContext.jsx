import { createContext, useContext, useEffect, useState } from "react";

// Création du contexte
const AuthContext = createContext();

// Provider du contexte
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Fonction de connexion
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/deconnexion", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error("Déconnexion échouée :", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Vérifie si un token et un user sont déjà en localStorage au chargement
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Contenu du contexte à partager
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom pour consommer le contexte facilement
export const useAuth = () => useContext(AuthContext);
