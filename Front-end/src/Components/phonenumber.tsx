import { useState, useRef } from "react";

interface PhoneInputProps {
  onPhoneChange?: (value: string) => void;
  setIsValid?: (isValid: boolean) => void;
}

function PhoneInput({ onPhoneChange, setIsValid }: PhoneInputProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Already handled filtering, just in case (for copy-paste)
    value = value.replace(/\D/g, "");

    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Auto-blur keyboard if 10 digits reached
    if (value.length === 10 && inputRef.current) {
      inputRef.current.blur();
    }

    setPhone(value);

    const dzPhoneRegex = /^(05|06|07)[0-9]{8}$/;
    const isValid = dzPhoneRegex.test(value);

    setError(isValid ? "" : "Invalid phone number");
    if (setIsValid) setIsValid(isValid);
    if (onPhoneChange) onPhoneChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation keys
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];

    // Prevent input if not a digit or not in allowed keys
    if (
      !allowedKeys.includes(e.key) &&
      !/^[0-9]$/.test(e.key)
    ) {
      e.preventDefault();
    }

    // Also prevent input if already 10 digits
    if (phone.length >= 10 && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <input
        type="tel"
        ref={inputRef}
        value={phone}
        placeholder="Enter your phone number"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 mb-4 border-b border-gray-400 focus:outline-none focus:border-green-400 focus:border-b-2"
        required
        inputMode="numeric"
        pattern="[0-9]*"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
}

export default PhoneInput;