import { useState, useEffect } from "react"; // ✅ Make sure this is at the top

const useDarkMode = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [enabled]);

  return [enabled, setEnabled] as const;
};

export default useDarkMode;
