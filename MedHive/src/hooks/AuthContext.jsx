import { Children, createContext, useContext,useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = (token) => {
        localStorage.setItem("token",token)
        setIsAuthenticated(true);}
    const logout = async () => {
        try {
                await fetch("http://localhost:5000/api/auth/deconnexion", { 
                method: "POST",
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }  
            });
        } catch (err) {
            console.error("logout failed", err);
        }
         finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);}
        };
    useEffect(()=> {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    },[])

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>{children}</AuthContext.Provider>
    );
};
//tis is the custom hook
export const useAuth = () => useContext(AuthContext);