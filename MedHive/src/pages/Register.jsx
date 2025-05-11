import { useState } from "react"; import { Link } from "react-router-dom";
import User from "../images/user.jpg"
import Pharma from "../images/pharmacy.jpg"

function Register() {
  const [userType, setUserType] = useState(null);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
     <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-2">Select <span className="text-green-600">user type</span></h2>
        <p className="text-gray-600 mb-8">Select the user type that represents you</p>

        <div className="flex space-x-6">
              <div
                onClick={() => setUserType("seller")}
                className={`cursor-pointer transition transform hover:scale-105 hover:shadow-[0px_0px_10px_4px_rgba(0,255,0,0.2)] flex-1 border rounded-xl p-6 flex items-center space-x-4 shadow-sm transition ${
                  userType === "seller" ? "border-green-500 bg-green-100" : "border-gray-200"
                }`}
              >
                <img
                  src={User}
                  alt="Seller"
                  className="w-20 h-20"
                />
                <div>
                  <h3 className="text-lg font-semibold">Seller</h3>
                  <p className="text-sm text-gray-500">You are an individual who is selling products that do not require a medical prescription</p>
                </div>
              </div>

              <div
                onClick={() => setUserType("pharmacy")}
                className={`cursor-pointer transition transform hover:scale-105 hover:shadow-[0px_0px_10px_4px_rgba(0,255,0,0.2)] flex-1 border rounded-xl p-6 flex items-center space-x-4 shadow-sm transition ${
                  userType === "pharmacy" ? "border-green-500 bg-green-100" : "border-gray-200"
                }`}
              >
                <img
                  src={Pharma}
                  alt="Pharmacy"
                  className="w-20 h-20"
                />
                <div>
                  <h3 className="text-lg font-semibold">Pharmacy</h3>
                  <p className="text-sm text-gray-500">You are a legal entity like a pharmacy</p>
                </div>
              </div>
            </div>

          {userType && (
            <div className="mt-10 text-center">
              <Link
                to={userType === "pharmacy" ? "/validation-phar" : "/sign-up"}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition"
              >
                Get started!
              </Link>
            </div>
          )}
      </div>
   </div>
 
  );
}

 export default Register

 

 