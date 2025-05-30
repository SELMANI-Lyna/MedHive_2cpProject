import React, { useState } from "react";
import axios from "axios";
import useDarkMode from "../hooks/UseDarkMode";

interface FormData {
  username: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  telephone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ParametersPage: React.FC<{ userData?: Partial<FormData> }> = ({
  userData = {},
}) => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [formData, setFormData] = useState<FormData>({
    username: userData?.username || "",
    facebook: userData?.facebook || "",
    instagram: userData?.instagram || "",
    linkedin: userData?.linkedin || "",
    telephone: userData?.telephone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const validatePhoneNumber = (number: string) =>
    /^(05|06|07)\d{8}$/.test(number);
  const validateNewPassword = (password: string) => password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validatePhoneNumber(formData.telephone)) {
      setErrorMessage(
        "Phone number must start with 05, 06 or 07 and be 11 digits long."
      );
      return;
    }

    if (formData.newPassword && !validateNewPassword(formData.newPassword)) {
      setErrorMessage("New password must be at least 6 characters.");
      return;
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    try {
      // Construire le payload à envoyer, sans currentPassword ni confirmPassword
      const payload: any = {
        username: formData.username,
        facebook: formData.facebook,
        instagram: formData.instagram,
        linkedin: formData.linkedin,
        telephone: formData.telephone,
      };

      if (formData.newPassword) {
        payload.newPassword = formData.newPassword;
      }

      const response = await axios.put(
        "http://localhost:5000/api/utilisateur/profil",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Settings successfully updated!");
      }
    } catch (error) {
      console.error("Error updating user settings:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to update settings.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  const getValue = (name: keyof FormData) => formData[name];

  return (
    <div className="w-[66vw] relative right-[1vw] font-inter mt-8 dark:bg-black p-6 rounded-md">
      <h2 className="underline text-xl font-bold text-left mb-4 text-[#2A2A2A] dark:text-white dark:bg-black">
        Settings
      </h2>
      <form
        onSubmit={handleSubmit}
        className="transition-colors text-black dark:text-white"
      >
        <div className="flex items-center gap-3 mb-6">
          <label className="text-sm">Edit your username:</label>
          <input
            type="text"
            name="username"
            value={getValue("username")}
            onChange={handleInputChange}
            className="w-[40%] p-2 border border-[#58BE80] rounded-md text-base text-black dark:text-white dark:border-gray-600 bg-white dark:bg-gray-800"
          />
        </div>

        <h3 className="text-sm text-left mb-4">Edit your contacts:</h3>
        <div className="space-y-3 ml-8 mb-10">
          {[
            { name: "facebook", icon: "/Images/framefb.png" },
            { name: "instagram", icon: "/Images/frameinsta.png" },
            { name: "linkedin", icon: "/Images/framelink.png" },
          ].map(({ name, icon }) => (
            <div key={name} className="flex items-center gap-3">
              <img src={icon} alt={name} className="w-6 h-6" />
              {editingField === name ? (
                <input
                  type="text"
                  name={name}
                  value={getValue(name as keyof FormData)}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  autoFocus
                  className="text-sm p-1 ml-2 border-b border-gray-400 focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              ) : (
                <span
                  onClick={() => setEditingField(name)}
                  className="text-sm underline cursor-pointer text-black dark:text-white"
                >
                  {getValue(name as keyof FormData) ||
                    name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
              )}
            </div>
          ))}

          <div className="flex items-center gap-3">
            <img src="/Images/frameW.png" alt="WhatsApp" className="w-6 h-6" />
            <div className="flex gap-2 items-center">
              <span className="text-base border-b border-gray-400 pb-1">
                +213
              </span>
              {editingField === "telephone" ? (
                <input
                  type="text"
                  name="telephone"
                  value={getValue("telephone")}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                    ];
                    if (
                      !allowedKeys.includes(e.key) &&
                      (!/^\d$/.test(e.key) || formData.telephone.length >= 10)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  autoFocus
                  className="text-sm p-1 focus:outline-none border-b border-gray-400 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="Phone"
                />
              ) : (
                <span
                  onClick={() => setEditingField("telephone")}
                  className="text-sm cursor-pointer border-b border-gray-400 pb-1 text-black dark:text-white dark:border-gray-600"
                >
                  {getValue("telephone") || "000-000-000"}
                </span>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-sm text-left mb-4 p-1 bg-[#8AC9B2] bg-opacity-40 rounded-md inline-block">
          Change password:
        </h3>

        <div className="flex items-center gap-3 mt-3 ml-12">
          <label className="text-sm">New password:</label>
          <input
            type="password"
            name="newPassword"
            value={getValue("newPassword")}
            onChange={handleInputChange}
            className="p-2 ml-12 border border-gray-400 rounded-md text-base bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3 mt-3 ml-12">
          <label className="text-sm">Confirm new password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={getValue("confirmPassword")}
            onChange={handleInputChange}
            className="p-2 border border-gray-400 rounded-md text-base bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {errorMessage && (
          <div className="text-red-600 text-center mt-4">{errorMessage}</div>
        )}

        <h3 className="text-sm text-left mb-4 p-1 bg-[#8AC9B2] bg-opacity-40 rounded-md inline-block mt-6">
          Advanced settings:
        </h3>
        <div className="mt-2 text-sm px-5 space-y-2">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="text-[#04AE4B] underline flex items-center space-x-2"
          >
            <img src="/Images/F2.png" alt="Theme" className="w-4 h-4" />
            <span>Change theme</span>
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="w-75 bg-[#58BE80] text-white px-2 py-2 rounded-lg shadow-lg hover:bg-[#1d9c51] transition duration-300"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParametersPage;
