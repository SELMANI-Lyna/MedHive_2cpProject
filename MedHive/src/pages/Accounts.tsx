import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import PharmacistInfo from "./PharmacistInfo";
import VendeurInfo from "./Vendeurinfo";
import ParametersPage from "./ParametersPage";
import { Link } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState<any>(null);
  const [pharmacyData, setPharmacyData] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [showParameters, setShowParameters] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:5000/api/utilisateur/${id}`
        );
        setUserData(userResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleButtonClick = (button: string) => {
    setSelectedButton(button);
    setShowInfo(button === "info");
    setShowParameters(button === "parameters");
  };

  const buttonClasses = (key: string) =>
    `w-[62%] flex items-center gap-x-2 text-left px-4 py-3 rounded-lg 
     dark:bg-black transition-all ${
       selectedButton === key
         ? "bg-[#BCE3CC] dark:border-[#BCE3CC]"
         : "hover:bg-[#BCE3CC]"
     }`;

  const isOwnProfile = currentUser?._id === userData?._id;

  return (
    <div className="w-full max-w-screen-xl dark:bg-black dark:text-white mx-auto font-inter overflow-x-hidden">
      <div className="w-full max-w-[1800px] bg-[#DAF6F02E] bg-opacity-20 dark:bg-black p-8 shadow-lg flex flex-col">
        <header className="text-[#3ACB74] text-2xl font-semibold mb-6 relative left-[4vw]">
          MedHive.com
        </header>
        <div className="flex gap-8">
          <div className="w-[24vw] relative left-[5vw] flex flex-col items-start">
            <div className="flex items-center w-full pl-2">
              <Link to="/">
                <button className="bg-[#DAF6F02E] bg-opacity-18">
                  <img src="/Images/arrow.png" alt="Back" className="w-6 h-6" />
                </button>
              </Link>
              <h2 className="text-xl font-semibold ml-2">Profile</h2>
            </div>
            <div className="relative flex flex-col left-[4vw] items-center">
              <div className="relative">
                <img
                  src={userData?.photoProfil || "/Images/telechargement.png"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full"
                />
                <span className="absolute top-1 right-2 bg-green-500 p-2 rounded-full text-white text-sm">
                  📷
                </span>
              </div>

              <div className="mt-3 text-center">
                <h3 className="text-lg font-semibold">
                  {userData?.username || "User"}
                </h3>
                <p className="text-green-500 mt-1">
                  {userData?.role || "Role"}
                </p>
              </div>
            </div>

            {/* Nav Buttons */}
            <nav className="mt-6 space-y-3 w-full px-4">
              <button
                onClick={() => {
                  setShowInfo(true);
                  setShowParameters(false);
                  handleButtonClick("info");
                }}
                className={`${buttonClasses("info")} whitespace-nowrap`}
              >
                <img src="/Images/frame2.png" alt="Info" className="w-5 h-5" />
                My Information
              </button>

              {isOwnProfile && (
                <button
                  onClick={() => {
                    setShowInfo(false);
                    setShowParameters(true);
                    handleButtonClick("parameters");
                  }}
                  className={buttonClasses("parameters")}
                >
                  <img
                    src="/Images/Frame3.png"
                    alt="Parameters"
                    className="w-5 h-5"
                  />
                  Parameters
                </button>
              )}
            </nav>
          </div>

          {/* Conditional rendering */}
          {showInfo &&
            (userData?.role === "Pharmacien" ? (
              <PharmacistInfo userData={userData} pharmacyData={pharmacyData} />
            ) : userData?.role === "Vendeur" ? (
              <VendeurInfo userData={userData} pharmacyData={pharmacyData} />
            ) : null)}

          {showParameters && <ParametersPage userData={userData} />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
