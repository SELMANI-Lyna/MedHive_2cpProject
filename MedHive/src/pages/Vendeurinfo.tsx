import React, { useEffect, useRef } from "react";

const VendeurInfo: React.FC<{ userData: any; pharmacyData: any }> = ({
  userData,
  pharmacyData,
}) => {
  const inputClass =
    "w-full p-3 ml-4 border border-[#B0B0B0] rounded-md text-base text-black dark:text-white dark:border-gray-600 bg-white dark:bg-gray-800";
  const textareaClass =
    "w-full p-3 ml-4 border border-[#B0B0B0] rounded-md text-base text-black dark:text-white dark:border-gray-600 bg-white dark:bg-gray-800";
  const labelClass =
    "block text-sm mb-1 text-left text-[#718096] dark:text-gray-400";
  const spanStyle = {
    borderBottom: "1px solid #B0B0B0",
    paddingBottom: "2px",
  };

  return (
    <div className="w-[66vw] relative right-[1vw] font-inter">
      <h2 className="text-xl text-left mb-6 underline text-black dark:text-white">
        My Professional Profile
      </h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        <div className="w-full">
          <label className={labelClass}>Username</label>
          <input
            type="text"
            value={userData?.username || "ines"}
            className={inputClass}
            readOnly
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={userData?.email || ""}
            className="w-full p-3 ml-5 border border-[#B0B0B0] rounded-md text-base text-black dark:text-white dark:border-gray-600 bg-white dark:bg-gray-800"
            readOnly
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Phone Number</label>
          <div className="flex gap-2 ml-4 font-inter items-center">
            <span
              className="text-base text-black dark:text-white"
              style={spanStyle}
            >
              {`+213`}
            </span>
            <span
              className="text-base text-black dark:text-white"
              style={spanStyle}
            >
              {userData?.telephone}
            </span>
          </div>
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Location</label>
          <input
            type="text"
            value={userData?.localisation || "Tizi Ouzou - Ville"}
            className={inputClass}
            readOnly
          />
        </div>
      </div>

      {/* Contacts */}
      <h3 className="mt-6 text-left text-sm text-[#718096] dark:text-gray-400">
        My Contacts:
      </h3>
      <div className="mt-3 ml-4 space-y-3">
        <a
          href={userData?.facebook || "#"}
          className="flex items-center gap-2 text-black dark:text-white underline decoration-black dark:decoration-white underline-offset-4 hover:text-gray-700"
        >
          <span className="flex items-center gap-2 text-sm">
            <img src="/Images/framefb.png" alt="Facebook" className="w-6 h-6" />
            <span>{userData?.facebook || "Facebook"}</span>
          </span>
        </a>
        <a
          href={userData?.instagram || "#"}
          className="flex items-center gap-2 text-black dark:text-white underline decoration-black dark:decoration-white underline-offset-4 hover:text-gray-700"
        >
          <span className="flex items-center gap-2 text-sm">
            <img
              src="/Images/frameinsta.png"
              alt="Instagram"
              className="w-6 h-6"
            />
            <span>{userData?.instagram || "Instagram"}</span>
          </span>
        </a>
        <a
          href={userData?.linkedin || "#"}
          className="flex items-center gap-2 text-black dark:text-white underline decoration-black dark:decoration-white underline-offset-4 hover:text-gray-700"
        >
          <span className="flex items-center gap-2 text-sm">
            <img
              src="/Images/framelink.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
            <span>{userData?.linkedin || "LinkedIn"}</span>
          </span>
        </a>
      </div>

      {/* License */}
    </div>
  );
};

export default VendeurInfo;
