import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
 
  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };
 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
 
  return (
    <div className="flex flex-row items-center justify-between max-w-md min-w-md mx-auto border-2 border-green-600 rounded-full mt-2 mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="p-2 flex-grow rounded-full bg-white focus:outline-none ml-4"
      />
     
      <button
        onClick={handleSearch}
        className="bg-transparent text-white text-2xl py-1 px-4 rounded cursor-pointer"
      >
        <i className="fa-solid fa-magnifying-glass text-green-600 hover:scale-110 transition-transform transform"></i>
      </button>
    </div>
  );
}

export default SearchBar;