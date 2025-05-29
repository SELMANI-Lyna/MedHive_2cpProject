import React, { useState } from "react";
import axios from "axios";

const TranslatePage: React.FC = () => {
  const [text, setText] = useState<string>(""); // Text input for translation
  const [translatedText, setTranslatedText] = useState<string>(""); // Translated output
  const [language, setLanguage] = useState<string>("fr"); // Default target language is French
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error message if translation fails

  // Handle the input text change
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // Handle language change (from dropdown)
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  // Translate function that calls the LibreTranslate API
  const translateText = async () => {
    if (text.trim() === "") {
      setError("Please enter some text to translate.");
      return;
    }

    setLoading(true); // Show loading while waiting for API response
    setError(""); // Reset any previous error message

    try {
      const response = await axios.post(
        "https://libretranslate.com/?source=auto&target=fr&q=",
        {
          q: text,
          source: "en",
          target: language,
          format: "text",
        }
      );

      // Check if the response contains the translated text
      if (response.data && response.data.translatedText) {
        setTranslatedText(response.data.translatedText); // Set the translated text
      } else {
        setError("Translation failed. No translated text found.");
      }
    } catch (error) {
      setError("Error while translating. Please try again."); // Show error if API call fails
      console.error("Error:", error); // Log the error for debugging
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-800 text-center rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
        Translate Text
      </h2>

      {/* Input field for the text to be translated */}
      <div className="mb-4">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to translate"
          className="w-full p-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-700"
        />
      </div>

      {/* Dropdown for selecting the target language */}
      <div className="mb-4">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-700"
        >
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ru">Russian</option>
          {/* Add more language options here */}
        </select>
      </div>

      {/* Translate button */}
      <button
        onClick={translateText}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {/* Show error message if translation fails */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Show the translated text */}
      {translatedText && (
        <div className="mt-4">
          <h3 className="font-bold text-lg text-black dark:text-white">
            Translated Text:
          </h3>
          <p className="text-black dark:text-white">{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslatePage;
