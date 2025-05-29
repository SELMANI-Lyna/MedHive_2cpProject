import React from "react";
import { Link } from "react-router-dom";
const LogChatbot: React.FC = () => {
  return (
    <div className="relative w-screen h-screen bg-[#F6FFFA] dark:bg-[#1A1A1A] overflow-x-hidden">
      {/* Back Button */}
      <Link to="/">
        <button className="absolute top-[30px]  bg-[#F6FFFA] left-[30px] text-gray-700 dark:text-white text-2xl">
          <img
            src="/Images/arrow.png"
            alt="Button Image"
            className="w-6 h-6 inline-block"
          />
        </button>
      </Link>

      {/* MedHive.com branding */}
      <div className="absolute top-[30px] right-[30px] text-[#3ACB74] dark:text-[#7EF3B6] font-semibold italic text-2xl">
        MedHive.com
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src="/Images/NeutralFace.png"
          alt="Neutral Face"
          className="w-24 h-24"
        />
        <p className="font-medium mt-6 mb-16 text-center text-black dark:text-white">
          YOU SHOULD HAVE AN ACCOUNT TO USE CHATBOT
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-9 w-full max-w-md">
          <Link to="/sign-in">
            <button className="w-full bg-white dark:bg-[#2A2A2A] text-[#0DD15F] border border-[#FFFFFF] dark:border-gray-600 font-bold py-2 px-4 rounded-md shadow-lg hover:bg-[#0DD15F] hover:text-white transition">
              Sign in
            </button>
          </Link>

          <Link to="/sign-up">
            <button className="w-full bg-white dark:bg-[#2A2A2A] text-[#0DD15F] border border-[#FFFFFF] dark:border-gray-600 font-bold py-2 px-4 rounded-md shadow-lg hover:bg-[#0DD15F] hover:text-white transition">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogChatbot;
